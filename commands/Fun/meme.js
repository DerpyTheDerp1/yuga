exports.run = (client, msg) => {
    const Discord = require('discord.js');
    const db = require('../db/db.json');
    const memes = db.memes;

    const meme = memes[Math.floor(Math.random() * memes.length)];

    const memeembed = new Discord.MessageEmbed()
        .setImage(meme);
    msg.channel.send({
        embed: memeembed
    });
};