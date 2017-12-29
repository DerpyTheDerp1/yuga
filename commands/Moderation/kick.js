const Discord = require('discord.js');

exports.run = (client, msg, args) => {
  const khelp = new Discord.MessageEmbed()
    .setTitle('Kick Usage')
    .setAuthor('Yuga')
    .setColor('#32CD32')
    .addField('About', 'Kicks a member', false)
    .addField('Usage', 'y!kick <tag member>', false)
    .addField('Perms required', 'Kick Members')
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();

  const user = args.join(' ');

  if (!user) return msg.channel.send({
    embed: khelp
  });

  const embed = new Discord.MessageEmbed()
    .setTitle('ACCESS DENIED')
    .setAuthor(msg.author.tag)
    .setColor(0xFF0000)
    .setDescription('You do not have the permissions needed to use this command. Missing perms: KICK_MEMBERS')
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();
  const haskick = 'KICK_MEMBERS';

  if (msg.member.hasPermission(haskick)) {

    msg.guild.member(msg.mentions.users.first()).kick();
    msg.channel.send(`User ${user} kicked!`);
  } else {
    msg.channel.send({
      embed
    });
  }
};