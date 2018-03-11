const yt = require('ytdl-core');
const YT = require('simple-youtube-api');
const youtube = new YT(process.env.YTKEY);

exports.run = async (client, msg, args) => {
    const [musicCommand, song] = args.join(' ').split(', ');
    if (musicCommand) {
        if (musicCommand == 'play' || musicCommand == 'p') {
            if (!song) return msg.reply('Please input a song!');
            const voiceChannel = msg.member.voiceChannel;

            if (!voiceChannel) return msg.reply('Please be in a voice channel first!');

            if (voiceChannel.permissionsFor(msg.guild.me).has('CONNECT') == false) return msg.reply('I cannot connect to this voice channel.');

            if (voiceChannel.permissionsFor(msg.guild.me).has('SPEAK') == false) return msg.reply('I cannot speak in this voice channel.');

            if (song.includes('https:///www.') || song.includes('http://www.')) {
                const connection = await voiceChannel.join();
                if (msg.guild.me.voiceChannel.connection.speaking) return msg.reply('Please wait until the current song is finished before playing this!');
                const stream = yt(song, {
                    audioonly: true,
                    quality: 'lowest'
                });
                var dispatcher = connection.play(stream, { bitrate: 'auto' });
                dispatcher.on('end', () => {
                    voiceChannel.leave();
                });
                dispatcher.setVolumeLogarithmic(1);
                msg.channel.send(`Now playing: ${song}`);
            } else {
                const searchTerm = song;
                youtube.searchVideos(searchTerm, 1)
                    .then(async (results) => {
                        const video = results[0];
                        const songURL = video.url;
                        const connection = voiceChannel.join();
                        if (msg.guild.me.voiceChannel.connection.speaking) return msg.reply('Please wait until the current song is finished before playing this!');
                        const stream = yt(songURL, {
                            audioonly: true,
                            quality: 'lowest'
                        });
                        var dispatcher = connection.play(stream, {
                            bitrate: 'auto'
                        });
                        dispatcher.on('end', () => {
                            voiceChannel.leave();
                            dispatcher.setVolumeLogarithmic(1);
                        });
                        msg.channel.send(`Now playing ${songURL}`);
                    }).catch((err) => {
                        msg.reply(`An error occured!\n\`\`\`${err.message}\`\`\``);
                    });
            }
        }
        if (musicCommand == 'setVolume' || musicCommand == 'volume' || musicCommand == 'v') {
            const volumeLevel = song;
            dispatcher.setVolumeLogarithmic(volumeLevel);
        }

        if (musicCommand == 'stop' || musicCommand == 'leave') {
            const voiceChannel = msg.member.voiceChannel;
            voiceChannel.leave();
            msg.channel.send('Ended playing.');
        }

        if (musicCommand == 'join' || musicCommand == 'summon') {
            const voiceChannel = msg.member.voiceChannel;
            voiceChannel.join();
        }

        if (musicCommand == 'search' || musicCommand == 's') {
            const searchTerm = song;
            if (!searchTerm) return msg.reply('Must specify a search term!');
            else {
                youtube.searchVideos(searchTerm, 1)
                    .then((results) => {
                        const video = results[0];
                        msg.channel.send(video.url);
                    }).catch((err) => {
                        msg.reply(`An error occured!\n\`\`\`${err.message}\`\`\``);
                    });
            }
        }
    } else return msg.reply('You must specify the music command you wish to use!');
};

exports.help = {
    'help': {
        name: 'Music',
        description: 'Music shoved into one command =D',
        category: 'Main',
        usage: 'y!music play OR p, <url or search term>\ny!music setVolume OR volume OR v, <volume level*>\ny!music stop OR leave\ny!music join OR summon\ny!music search OR s, <search term>\n\n*Volume level refers to how loud it should be.\n0 is quiet, 1 is louder.\nDecimals are supported such as .1 - .9\n\nNOTE: Music is very laggy and experimental as of now',
        requiredPerms: 'Connect to voice channel',
    },
};