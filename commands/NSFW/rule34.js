const Kaori = require('kaori');
const sites = require('../../db/r34sites.json');

const kaori = new Kaori(sites);

const { MessageEmbed } = require('discord.js');

exports.run = (client, msg, args) => {
    if (msg.channel.nsfw == false) return msg.reply('This channel isn\'t NSFW!');
    const tag = args.join(' ');
    kaori.search('e621', { tags: [tag], limit: 1, random: true })
        .then((images) => {
            const r34Embed = new MessageEmbed()
                .setImage(images[0].common.fileURL);
            msg.channel.send({ embed: r34Embed });
        })
        .catch(err => msg.reply(`An error occured!\n\n\`${err.message}\``));
};

exports.help = {
  'help': {
    name: 'Rule 34',
    description: 'Searches a Rule34 Site',
    category: 'NSFW',
    usage: 'y!rule34 <term>',
    requiredPerms: 'None, Channel must be NSFW',
  },
};