const { MessageEmbed } = require('discord.js');
const { gifs } = require('../../db/db.js');

exports.run = (client, msg) => {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const pokeGifs = gifs.poke;
  const pokeGif = pokeGifs[randomInt(0, 3)];
  const author = msg.author.username;

  const pokeperson = msg.mentions.users.first();
  const person = pokeperson.username;

  const poked = new MessageEmbed()
    .setTitle(`${person}, you got poked by **${author}**!`)
    .setImage(pokeGif)
    .setColor(0xff0000);

  msg.channel.send({
    embed: poked,
  });
};

exports.help = {
  'help': {
    name: 'Poke',
    description: 'Poke anyone!',
    category: 'Fun',
    usage: 'y!poke <tag user>',
    requiredPerms: 'None',
  },
};
