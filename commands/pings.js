const recentPings = require('./ping.js').recentPings;
const Discord = require('discord.js');

exports.run = (client, msg) => {
    const recentPingEmbed = new Discord.MessageEmbed()
        .setAuthor('Yuga')
        .setTitle('Recent Pings')
        .setDescription(`These are Yuga's most recent pings!\n\n\n${recentPings.split('\n')}'`)
        .setTimestamp()
        .setThumbnail(client.user.avatarURL());

    msg.channel.send({
        embed: recentPingEmbed
    });
}