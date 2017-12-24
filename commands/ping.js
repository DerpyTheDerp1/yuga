const Discord = require('discord.js');
const db = require('../db/db.json');

exports.run = async(client, msg) => {
    const author = msg.author.tag;
    console.log('Pinging!');
    const startTime = Date.now();
    const message = await msg.channel.send('Pinging');
    const endTime = Date.now();
    const ping = Math.round(endTime - startTime);
    const time = new Date();
    const timeNow = ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2) + ':' + ('0' + time.getSeconds()).slice(-2);
    const recentpings = [];
    recentpings.push(`Ping: ${ping}ms | Time: ${timeNow}`);

    const roundedping = ping / 1000;
    const pingembed = new Discord.MessageEmbed()
        .addField('PING', `**${ping}** milliseconds\n**${roundedping}** seconds`)
        .setTimestamp()
        .setThumbnail(client.user.avatarURL())
        .setColor(`${db.color}`);
    message.edit({
        embed: pingembed
    });
    console.log('Pinged by ' + author);

    module.exports.recentPings = recentpings;
};