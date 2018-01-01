const Discord = require('discord.js');
const yt = require('ytdl-core');

exports.run = (client, message, args) => {
    const [musicCommand, song] = args.join(' ').split(', ');
    if (musicCommand) {
        if (musicCommand == 'play') {
            const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) {
                return message.reply('Please be in a voice channel first!');
            }
            voiceChannel.join()
                .then(connnection => {
                    const stream = yt(song, {
                        audioonly: true
                    });
                    const dispatcher = connnection.playStream(stream);
                    dispatcher.on('end', () => {
                        voiceChannel.leave();
                    });
                    dispatcher.setVolumeLogarithmic(5 / 5);
                });
        }
    } else return msg.reply('You must specify the music command you wish to use!');
};