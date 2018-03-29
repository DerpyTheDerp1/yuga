const Discord = require('discord.js');
const { color } = require('../../db/db.js');

exports.run = (client, msg) => {
  const serverinfo = new Discord.MessageEmbed()
    .setTitle(`Server info for ${msg.guild.name}`)
    .setThumbnail(client.user.avatarURL())
    .setImage(msg.guild.iconURL({
      size: 256,
    }))
    .setColor(color)
    .addField('Owner', `${msg.guild.owner} ID: ${msg.guild.owner.id}`)
    .addField('Created at', msg.guild.createAt, true)
    .addField('Channels', msg.guild.channels.size, true)
    .addField('Roles', msg.guild.roles.size, true)
    .addField('Users', msg.guild.members.filter(m => !m.user.bot).size, true)
    .addField('Total users', msg.guild.members.size, true);
  msg.channel.send({
    embed: serverinfo,
  });
};
