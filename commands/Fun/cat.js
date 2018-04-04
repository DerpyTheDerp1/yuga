const { getCat } = require('animals-api');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, msg) => {
  const catEmbed = new MessageEmbed();
  try {
      const url = await getCat(['jpg', 'png', 'gif']);
      catEmbed.setImage(url);
  } catch (e) {
      msg.reply(`An error occured! \`${e}\``);
  }
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