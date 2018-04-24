const { getBirb } = require('animals-api');
const { Command } = require('discord-akairo');

class BirbCommand extends Command {
    constructor() {
        super('birb', {
                aliases: ['birb'],
                category: 'Fun',
                typing: true

            }),

            this.help = {
                'help': {
                    name: 'Birb',
                    description: 'Returns a randomized image of a birb =D',
                    category: 'Fun',
                    usage: 'y!birb',
                    aliases: 'None',
                    DMs: 'Yes',
                    UserPerms: 'None',
                    YugaPerms: 'Send Messages'
                }
            };
    }

    async exec(msg) {
        const birbEmbed = this.client.util.embed();
        try {
            const url = await getBirb(['jpg', 'png', 'gif']);
            birbEmbed.setImage(url);
            return msg.channel.send({ embed: birbEmbed });
        } catch (e) {
            return msg.reply(`An error occured! \`${e}\``);
        }
    }
}

module.exports = BirbCommand;