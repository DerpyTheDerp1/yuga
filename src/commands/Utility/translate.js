const translate = require('google-translate-api');
const Discord = require('discord.js');
const { color } = require('db');

exports.run = (client, msg, args) => {
    const autohelp = new Discord.MessageEmbed()
        .setTitle('Translate Usage')
        .setAuthor('Yuga')
        .setColor(color)
        .addField('About', 'Automatically translates from one input language to a selected output language.', false)
        .addField('Usage', 'y!translate <input text>, <output lang **prefix OR lang name**>', false)
        .addField('Perms required', 'None')
        .addField('NOTE', 'Find out the prefixes from Google, or use the language name.')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();
    let [text, lang] = args.join(' ').split(', ');
    if (!lang) lang = 'English';
    if (!text && lang) {
        msg.channel.send({
            embed: autohelp
        });
    }
    translate(text, {
        to: lang
    }).then(out => {

        const output = new Discord.MessageEmbed()
            .setTitle('AUTOMATIC')
            .setColor(color)
            .setThumbnail(client.user.avatarURL())
            .addField(`INPUT (${out.from.language.iso})`, `${text}`)
            .addField(`OUTPUT (${lang})`, `${out.text}`);

        msg.channel.send({
            embed: output
        });
    }).catch(err => {
        console.error(err);
    });
};