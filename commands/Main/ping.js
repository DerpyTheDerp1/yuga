const { color } = require('../../db/db.js');
const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
                category: 'Main',
                aliases: ['ping', 'pong']
            }),

            this.help = {
                'help': {
                    name: 'Ping',
                    description: 'Checks the response time of the bot',
                    category: 'Main',
                    usage: 'y!ping',
                    requiredPerms: 'None',
                }
            };
    }

    async exec(msg) {
        console.log('Pinging!');
        const startTime = Date.now(),
            message = await msg.channel.send('Pinging'),
            endTime = Date.now(),
            ping = Math.round(endTime - startTime),
            roundedPing = ping / 1000,
            pingEmbed = this.client.util.embed()
            .addField('PING', `**${ping}** milliseconds\n**${roundedPing}** seconds`)
            .setTimestamp()
            .setThumbnail(this.client.user.avatarURL())
            .setColor(`${color}`);
        console.log(`Pinged by ${msg.author.tag}`);
        return message.edit({
            embed: pingEmbed,
        });
    }
}

module.exports = PingCommand;