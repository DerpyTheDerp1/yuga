const yt = require('ytdl-core');

exports.run = async (client, msg, args) => {
    const [musicCommand, song] = args.join(' ').split(', ');
    if (musicCommand) {

        if (musicCommand == 'play' || musicCommand == 'p') {
            if (connection.speaking) return msg.reply('Please wait until current song is finished.');
            if (!song) return msg.reply('Please input a song!');
            const voiceChannel = msg.member.voiceChannel;

            if (!voiceChannel) return msg.reply('Please be in a voice channel first!');

            if (voiceChannel.permissionsFor(msg.guild.me).has('CONNECT') == false) return msg.reply('I cannot connect to this voice channel.');

            if (voiceChannel.permissionsFor(msg.guild.me).has('SPEAK') == false) return msg.reply('I cannot speak in this voice channel.');

            if (voiceChannel) {
                const connection = await voiceChannel.join();
                voiceChannel.leave();
                const stream = yt(song, {
                    audioonly: true,
                    quality: 'lowest'
                });

                dispatcher = connection.play(stream, { bitrate: 'auto' });
                dispatcher.on('end', () => {
                    voiceChannel.leave();
                });
                dispatcher.setVolumeLogarithmic(1);
                msg.channel.send(`Now playing: ${song}`);

            } else {
                const connection = await voiceChannel.join();
                const stream = yt(song, {
                    audioonly: true,
                    quality: 'lowest'
                });
                dispatcher = connection.play(stream, { bitrate: 'auto' });
                dispatcher.on('end', () => {
                    voiceChannel.leave();
                });
                dispatcher.setVolumeLogarithmic(1);
                msg.channel.send(`Now playing: ${song}`);
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
    } else return msg.reply('You must specify the music command you wish to use!');
};

exports.help = {
    'help': {
        name: 'Music',
        description: 'Music shoved into one command =D',
        category: 'Main',
        usage: 'y!music play OR p, <url>\ny!music setVolume OR volume OR v, <volume level*>\ny!music stop OR leave\ny!music join OR summon\n\n*Volume level refers to how loud it should be.\n0 is quiet, 1 is louder.\nDecimals are supported such as .1 - .9\n\nNOTE: Music is very laggy and experimental as of now',
        requiredPerms: 'Connect to voice channel'
    }
};