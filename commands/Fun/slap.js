const { MessageEmbed } = require('discord.js');
const { gifs } = require('../../db/db.js');
exports.run = (client, msg) => {
    const author = msg.author.username;
    const slappedperson = msg.mentions.users.first();
    const person = slappedperson.username;

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const slapGifs = gifs.slap;
    const slapGif = slapGifs[randomInt(0, 10)];
    const slapped = new MessageEmbed()
        .setTitle(`${person}, you got slapped by **${author}**!`)
        .setImage(slapGif)
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