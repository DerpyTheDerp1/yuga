const { getDog } = require('animals-api');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, msg) => {
  const dogEmbed = new MessageEmbed();
  try {
    const url = await getDog(['jpg', 'png', 'gif']);
    dogEmbed.setImage(url);
  } catch (e) {
    msg.reply(`An error occured! \`${e}\``);
  }
};

exports.help = {
    'help': {
        name: 'Dog',
        description: 'Returns a randomized image of a dog =D',
        category: 'Fun',
        usage: 'y!dog',
        requiredPerms: 'None',
    },
};