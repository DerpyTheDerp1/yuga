exports.run = (client, msg, args) => {
  const user = args.join(' ');

  const Discord = require('discord.js');
  const embed = new Discord.MessageEmbed()
    .setTitle('ACCESS DENIED')
    .setAuthor(msg.author.tag)
    .setColor(0xFF0000)
    .setDescription('You do not have the permissions needed to use this command. Missing perms: BAN_MEMBERS')
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();
  const banhelp = new Discord.MessageEmbed()
    .setTitle('Ban Usage')
    .setAuthor('Yuga')
    .setColor(0x32CD32)
    .addField('About', 'Bans a user', false)
    .addField('Usage', 'y!ban <tag user>', false)
    .addField('Perms required', 'Ban members')
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();

  if (!user) return msg.channel.send({
    embed: banhelp
  });

  const hasban = 'BAN_MEMBERS';

  if (msg.member.hasPermission(hasban)) {
    msg.guild.member(user).ban();
    msg.reply(`The ban hammer :hammer: has struck on ${user}!`);
  } else {
    msg.channel.send({
      embed
    });
  }

};