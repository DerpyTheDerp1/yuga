const Discord = require('discord.js');
const { gifs } = require('../../db/db.js');

exports.run = (client, msg) => {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const hugGifs = gifs.hug;
  const hugGif = hugGifs[randomInt(0, 13)];
  const author = msg.author.username;

  const huggedperson = msg.mentions.users.first();
  const person = huggedperson.username;
  const hugged = new Discord.MessageEmbed()
    .setTitle(`${person}, you got hugged by **${author}**!`)
    .setImage(hugGif)
    .setColor('#FFC0CB');

  msg.channel.send({
    embed: hugged,
  });
};

exports.help = {
  'help': {
    name: 'Hug',
    description: 'Hug someone!',
    category: 'Fun',
    usage: 'y!hug <tag user>',
    requiredPerms: 'None',
  },
};
