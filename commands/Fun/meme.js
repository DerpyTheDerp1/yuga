exports.run = (client, msg) => {
    const Discord = require('discord.js');
    const db = require('../../db/db.json');
    const memes = db.memes;

    const meme = memes[Math.floor(Math.random() * memes.length)];

    const memeEmbed = new Discord.MessageEmbed()
        .setImage(meme);
    msg.channel.send({
        embed: memeEmbed
    });
};

exports.help = {
    'help': {
        name: 'Meme',
        description: 'dAnK mEmEs bOi',
        category: 'Fun',
        usage: 'y!meme',
        requiredPerms: 'None'
    }
}