const { color } = require('../../db/db.js');
const { Command } = require('discord-akairo');
const { client } = require('../../main.js');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            category: 'Main',
            aliases: ['pong']
        });
    }

    async exec(msg) {
        const author = msg.author.tag;
        console.log('Pinging!');
        const startTime = Date.now();
        const message = await msg.channel.send('Pinging');
        const endTime = Date.now();
        const ping = Math.round(endTime - startTime);

        const roundedping = ping / 1000;
        const pingembed = client.util.embed()
            .addField('PING', `**${ping}** milliseconds\n**${roundedping}** seconds`)
            .setTimestamp()
            .setThumbnail(client.user.avatarURL())
            .setColor(`${color}`);
        console.log(`Pinged by ${author}`);
        return message.edit({
            embed: pingembed,
        });
    }
}

module.exports = PingCommand;
exports.help = {
    'help': {
        name: 'Ping',
        description: 'Checks the response time of the bot',
        category: 'Main',
        usage: 'y!ping',
        requiredPerms: 'None',
    },
};