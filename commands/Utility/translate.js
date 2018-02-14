const translate = require('google-translate-api');
const Discord = require('discord.js');
const { color } = require('../../db/db.js');

exports.run = (client, msg, args) => {
    const things = args.join(' ');
    const text = things.split(', ');
    let lang = things.split(', ');
    if (!lang) lang = 'English';
    translate(text, {
        to: lang,
    }).then((out) => {
        const output = new Discord.MessageEmbed()
            .setTitle('AUTOMATIC')
            .setColor(color)
            .setThumbnail(client.user.avatarURL())
            .addField(`INPUT (${out.from.language.iso})`, `${text}`)
            .addField(`OUTPUT (${lang})`, `${out.text}`);

        msg.channel.send({
            embed: output,
        });
    }).catch((err) => {
        console.error(err);
    });
};