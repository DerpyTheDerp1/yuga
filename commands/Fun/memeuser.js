exports.run = (client, msg, args) => {
    const Discord = require('discord.js');
    const memeusrhelp = new Discord.MessageEmbed()
        .setTitle('Warn Usage')
        .setAuthor('Yuga')
        .setColor(0x32CD32)
        .addField('About', 'Memes a user\'s avatar', false)
        .addField('Usage', 'y!memeuser <tag user> | <top text> | <bottom text>', false)
        .addField('Perms required', 'None')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();

    const [usr, top, bottom] = args.join(' ').split(' | ');
    const user = msg.mentions.users.first();
    if (!usr && !top && !bottom) return msg.channel.send({
        embed: memeusrhelp
    });
    if (!usr) return msg.reply('Invalid, no user defined.');
    if (!top) return msg.reply('Invalid, top text missing.');
    if (!bottom) return msg.reply('Invalid, bottom text missing.');


    const image = user.avatarURL();
    const memeurl = `https://memegen.link/custom/${encodeURIComponent(top)}/${encodeURIComponent(bottom)}.jpg?alt=${encodeURIComponent(image)}&font=impact`;
    const meme = new Discord.MessageEmbed()
        .setImage(memeurl);

    msg.channel.send({
        embed: meme
    });
};