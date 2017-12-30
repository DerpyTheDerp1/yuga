const Discord = require('discord.js');

exports.run = (client, msg) => {
  const denied = new Discord.MessageEmbed()
    .setTitle('ACCESS DENIED')
    .setAuthor(msg.author.tag)
    .setColor(0xFF0000)
    .setDescription('You do not have the permissions needed to use this command. Missing perms: KICK_MEMBERS')
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();
  const haskick = 'KICK_MEMBERS';

  if (!msg.mentions.users.first()) return msg.reply('Must specify a user!');
  if (msg.member.hasPermission(haskick)) {

    msg.guild.member(msg.mentions.users.first()).kick();
    msg.channel.send(`User **${msg.mentions.users.first().username}** kicked!`);
  } else {
    msg.channel.send({
      embed: denied
    });
  }
};

exports.help = {
  'help': {
    name: 'Kick',
    description: 'Kicks a member',
    category: 'Moderation',
    usage: 'y!kick <tag user>',
    requiredPerms: 'None'
  }
};