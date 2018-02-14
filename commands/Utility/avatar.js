const { MessageEmbed } = require('discord.js');

exports.run = (client, msg) => {
  const user = msg.mentions.users.first();
  const avatar = user.avatarURL({
    size: 2048,
  });

  const avatarembed = new MessageEmbed()
    .setTitle(`Avatar of ${user.tag} (click here to get the avatar)`)
    .setURL(avatar)
    .setImage(avatar)
    .setTimestamp();

  msg.channel.send({
    embed: avatarembed,
  });
};

exports.help = {
  'help': {
    name: 'Avatar',
    description: 'Returns the avatar of a specified user',
    category: 'Utility',
    usage: 'y!avatar <tag user>',
    requiredPerms: 'None',
  },
};
