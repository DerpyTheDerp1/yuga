const Discord = require('discord.js');
const snekfetch = require('snekfetch');

exports.run = async (client, msg) => {
  let res = await snekfetch.get('http://random.cat/meow');
  while (res.body.file.includes('.mp4') || res.body.file.includes('.gif')) {
    res = await snekfetch.get('http://random.cat/meow');
  }
  const embed = new Discord.MessageEmbed()
    .setImage(res.body.file);
  msg.channel.send({
    embed,
  });
};

exports.help = {
  'help': {
    name: 'Cat',
    description: 'Returns a randomized image of a cat =D',
    category: 'Fun',
    usage: 'y!cat',
    requiredPerms: 'None',
  },
};
