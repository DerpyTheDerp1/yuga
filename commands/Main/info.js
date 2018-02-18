const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { version } = require('../../package.json');

exports.run = (client, msg) => {
    const lastRestart = client.readyAt.toISOString().replace(/z|t/gi, ' ').trim();
    const totalMemUsage = Object.entries(process.memoryUsage())
        .map(
            ([key, value]) =>
            `${key}: ${Math.round(value / 1024 / 1024 * 100) / 100} MB`
        )
        .join('\n');

    const guildInfo = stripIndents `
    Guilds: ${client.guilds.size}
    Channels: ${client.channels.size}
    `;

    const cpuUsage = String(process.cpuUsage().system / 1000000) + '%';

    const infoEmbed = new MessageEmbed()
        .setTitle(`Yuga Version ${version}`)
        .setTimestamp()
        .setThumbnail(client.user.avatarURL())
        .addField('Memory Usage', totalMemUsage, true)
        .addField('Last restart', lastRestart, true)
        .addField('Guild Infos', guildInfo, true)
        .addField('CPU Usage', cpuUsage, true);
    msg.channel.send({ embed: infoEmbed });
};