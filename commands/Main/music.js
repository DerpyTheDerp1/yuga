const yt = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.YTKEY);

exports.run = async(client, msg, args) => {
    let [musicCommand, song] = args.join(' ').split(' ');
    if (musicCommand) {

        if (musicCommand == 'play' || musicCommand == 'p') {
            if (!song) return msg.reply('Please input a song!');
            voiceChannel = msg.member.voiceChannel;

            if (song.includes('https://' == false)) {
                youtube.searchVideos(searchTerm, 1)
                    .then(results => {
                        const video = results[0];
                        song = video.url;
                    })
                    .catch(err => {
                        msg.reply(`An error occured!\n\`\`\`${err.message}\`\`\``);
                    });
            }

            if (!voiceChannel) return msg.reply('Please be in a voice channel first!');

            if (voiceChannel.permissionsFor(msg.guild.me).has('CONNECT') == false) return msg.reply('I cannot connect to this voice channel.');

            if (voiceChannel.permissionsFor(msg.guild.me).has('SPEAK') == false) return msg.reply('I cannot speak in this voice channel.');

            if (voiceChannel) {
                voiceChannel.leave();
                const connection = await voiceChannel.join();
                const stream = yt(song, {
                    audioonly: true
                });

                dispatcher = connection.playStream(stream);
                dispatcher.on('end', () => {
                    voiceChannel.leave();
                });
                dispatcher.setVolumeLogarithmic(1);
                msg.channel.send(`Now playing: ${song}`);

            } else {
                const connection = await voiceChannel.join();
                const stream = yt(song, {
                    audioonly: true
                });
                dispatcher = connection.playStream(stream);
                dispatcher.on('end', () => {
                    voiceChannel.leave();
                });
                dispatcher.setVolumeLogarithmic(1);
                msg.channel.send(`Now playing: ${song}`);
            }
        }

        if (musicCommand == 'setVolume' || musicCommand == 'volume' || musicCommand == 'v') {
            volumeLevel = song;
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
    } else return msg.reply('You must specify the music command you wish to use!');
};

exports.help = {
    'help': {
        name: 'Music',
        description: 'Music shoved into one command =D',
        category: 'Main',
        usage: 'y!music play OR p <url or search term>\ny!music setVolume OR volume OR v <volume level*>\ny!music stop OR leave\ny!music join OR summon\n\n*Volume level refers to how loud it should be.\n0 is quiet, 1 is louder.\nDecimals are supported such as .1 - .9',
        requiredPerms: 'Connect to voice channel'
    }
};