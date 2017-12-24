const Discord = require('discord.js');
const db = require('../db/db.json');

exports.run = async (client, msg) => {
    const author = msg.author.tag;
    console.log('Pinging');
    const m1 = await msg.channel.send('Pinging');
    const m2 = await m1.edit('Please wait...');
    const ping = Math.round(m2.createTimestamp - m1.createTimestamp);
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
};