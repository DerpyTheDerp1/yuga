const Discord = require('discord.js');
const yt = require('ytdl-core');

exports.run = async(client, message, args) => {
    let [musicCommand, song] = args.join(' ').split(', ');
    if (musicCommand) {
        if (musicCommand == 'play') {
            if (!song) return msg.reply('Please input a song!');
            const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) {
                return message.reply('Please be in a voice channel first!');
            }
            const connection = await voiceChannel.join();
            const stream = yt(song, {
                audioonly: true
            });
            const dispatcher = connection.playStream(stream);
            dispatcher.on('end', () => {
                voiceChannel.leave();
            });
            dispatcher.setVolumeLogarithmic(5 / 5);
            msg.channel.send(`Now playing: ${song}`);
        }

        if (musicCommand == 'setVolume') {
            volumeLevel = song;
            dispatcher.setVolumeLogarithmic(volumeLevel);
        }
    } else return msg.reply('You must specify the music command you wish to use!');
};