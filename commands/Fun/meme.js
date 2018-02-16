const { MessageEmbed } = require('discord.js');
let meme = '';
exports.run = (client, msg, args) => {
    const memeType = args.join(' ');
    const { memes } = require('../../db/db.js');

    const generalMemes = memes.generalMemes;
    const monikaMemes = memes.monikaMemes;
    const discordMemes = memes.discordMemes;
    const antiMemes = memes.antiMemes;

    if (!memeType) return meme = generalMemes[Math.floor(Math.random() * generalMemes.length)];
    if (memeType == 'monika') return meme = monikaMemes[Math.floor(Math.random() * monikaMemes.length)];
    if (memeType == 'discord') return meme = discordMemes[Math.floor(Math.random() * discordMemes.length)];
    if (memeType == 'antimeme') return meme = antiMemes[Math.floor(Math.random() * antiMemes.length)];

    const memeEmbed = new MessageEmbed()
        .setImage(meme);
    msg.channel.send({
        embed: memeEmbed,
    });
};

exports.help = {
    'help': {
        name: 'Meme',
        description: 'dAnK mEmEs bOi',
        category: 'Fun',
        usage: 'y!meme <category>\n\nCategory can be one of explicitely:\nmonika (Monika Memes)\ndiscord (Discord Memes)\nanti (Anti Memes)\n\nPlease note you can just leave it blank for a random meme.',
        requiredPerms: 'None',
    },
};