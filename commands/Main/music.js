const yt = require('ytdl-core');

exports.run = async(client, msg, args) => {
    const [musicCommand, song] = args.join(' ').split(' ');
    if (musicCommand) {
        if (musicCommand == 'play' || musicCommand == 'p') {
            if (!song) return msg.reply('Please input a song!');
            voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel) {
                return msg.reply('Please be in a voice channel first!');
            }
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
            }

            else {
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
            msg.channel.send('Ended playing');
        }

        if (musicCommand == 'join' || musicCommand == 'summon') {
            voiceChannel.join();
        }
    } else return msg.reply('You must specify the music command you wish to use!');
};