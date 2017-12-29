const moment = require('moment');
require('moment-duration-format');
const Discord = require('discord.js');
const color = require('../db/db.json').color;

exports.run = (client, msg) => {
    const embed = new Discord.MessageEmbed()
        .setTitle('Uptime')
        .setDescription(moment.duration(client.uptime).format(' D [days], H [hours], m [minutes], s [seconds]'))
        .setColor(color)
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();
        msg.channel.send({
        embed
    });
};