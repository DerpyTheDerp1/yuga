const Discord = require('discord.js');

exports.run = (client, msg, args) => {
  const help = new Discord.MessageEmbed()
    .setTitle('Hug Usage')
    .setAuthor('Yuga')
    .setColor('#32CD32')
    .addField('About', 'Hugs a user', false)
    .addField('Usage', 'y!hug <tag user>', false)
    .addField('Perms required', 'None')
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();
  if (!args.join(' ')) return msg.channel.send({
    embed: help
  });

  const hug = 'http://striker.demoted.me/26534.gif';
  const author = msg.author.username;

  const huggedperson = msg.mentions.users.first();
  const person = huggedperson.username;
  const hugged = new Discord.MessageEmbed()
    .setTitle(`${person}, you got hugged by **${author}**!`)
    .setImage(hug)
    .setColor('#FFC0CB');

  msg.channel.send({
    embed: hugged
  });
};