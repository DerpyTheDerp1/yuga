const { getBirb } = require('animals-api');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, msg) => {
    const birbEmbed = new MessageEmbed();
    try {
        const url = await getBirb(['jpg', 'png', 'gif']);
        birbEmbed.setImage(url);
    } catch (e) {
        msg.reply(`An error occured! \`${e}\``);
    }
};

exports.help = {
    'help': {
        name: 'Birb',
        description: 'Returns a randomized image of a birb =D',
        category: 'Fun',
        usage: 'y!birb',
        requiredPerms: 'None',
    },
};