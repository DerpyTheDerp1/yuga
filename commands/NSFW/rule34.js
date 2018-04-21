const { Command } = require('discord-akairo');
const Kaori = require('kaori');
const sites = require('../../db/r34sites.json');

const kaori = new Kaori(sites);

class rule34Command extends Command {
    constructor() {
        super('rule34', {
                category: 'NSFW',
                aliases: ['rule34', 'r34'],
                args: [
                {
                    id: 'tag',
                    type: 'string'
                }]
            }),

            this.help = {
                name: 'rule34',
                description: 'Returns a naughty naughty image',
                category: 'NSFW',
                usage: 'y!rule34 <search term>',
                requiredPerms: 'None, Channel must be NSFW',
            };
    }

    exec(msg, args) {
        if (msg.channel.nsfw == false) return msg.reply('This channel isn\'t NSFW!');
        const tag = args.tag;
        kaori.search('e621', { tags: [tag], limit: 1, random: true })
            .then((images) => {
                const r34Embed = this.client.util.embed()
                    .setImage(images[0].common.fileURL);
                return msg.channel.send({ embed: r34Embed });
            })
            .catch(err => { return msg.reply(`An error occured!\n\n\`${err.message}\``); });
    }
}

module.exports = rule34Command;