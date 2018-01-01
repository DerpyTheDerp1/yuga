const Discord = require('discord.js');
const yt = require('ytdl-core');

exports.run = async(client, msg, args) => {
    const [musicCommand, song] = args.join(' ').split(' ');
    if (musicCommand) {
        if (musicCommand == 'play') {
            if (!song) return msg.reply('Please input a song!');
            const voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel) {
                return msg.reply('Please be in a voice channel first!');
            }
            const connection = await voiceChannel.join();
            const stream = yt(song, {
                audioonly: true
            });
            dispatcher = connection.playStream(stream);
            console.log(dispatcher);
            dispatcher.on('end', () => {
                voiceChannel.leave();
            });
            dispatcher.setVolumeLogarithmic(5 / 5);
            msg.channel.send(`Now playing: ${song}`);
        }

        if (musicCommand == 'setVolume') {
            volumeLevel = song;
            console.log(dispatcher);
            dispatcher.setVolumeLogarithmic(volumeLevel);
        }

        if (musicCommand == 'stop' || musicCommand == 'leave') {
            const voiceChannel = msg.member.voiceChannel;
            voiceChannel.leave();
            msg.channel.send('Ended playing');
        }
    } else return msg.reply('You must specify the music command you wish to use!');
};