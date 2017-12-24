const recentPings = require('./ping.js').recentPings;
const Discord = require('discord.js');
let pings = recentPings.toString();
pings = pings.split('\n');

exports.run = (client, msg) => {
    const recentPingEmbed = new Discord.MessageEmbed()
        .setAuthor('Yuga')
        .setTitle('Recent Pings')
        .setDescription(`These are Yuga's most recent pings!\n\n\n${pings}}'`)
        .setTimestamp()
        .setThumbnail(client.user.avatarURL());

    msg.channel.send({
        embed: recentPingEmbed
    });
}