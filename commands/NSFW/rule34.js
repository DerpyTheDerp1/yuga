const Kaori = require('kaori');
const sites = require('./r34sites');

const kaori = new Kaori(sites);

const { MessageEmbed } = require('discord.js');

exports.run = (client, msg, args) => {
    if (msg.channel.nsfw == false) return msg.reply('This channel isn\'t NSFW!');
    const [site, tag] = args.join(' ').split(' | ');
    kaori.search(site, { tags: [tag], limit: 1, random: true })
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
    usage: 'y!rule34 <site*> | <term>\n\n*Site must be one of the supported ones.\nCurrently supported: e621',
    requiredPerms: 'None, Channel must be NSFW',
  },
};