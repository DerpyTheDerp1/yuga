exports.run = (client, msg) => {
  const Discord = require('discord.js');
  const slap = 'http://striker.demoted.me/6502.gif';
  const author = msg.author.username;
  const slappedperson = msg.mentions.users.first();
  const person = slappedperson.username;

  const slapped = new Discord.MessageEmbed()
    .setTitle(`${person}, you got slapped by **${author}**!`)
    .setImage(slap)
    .setColor('#ff0000');

  msg.channel.send({
    embed: slapped
  });
};

exports.help = {
  'help': {
    name: 'Slap',
    description: 'Slap anyone!',
    category: 'Fun',
    usage: 'y!slap <tag user>',
    requiredPerms: 'None'
  }
};