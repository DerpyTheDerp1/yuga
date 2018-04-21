const { Command } = require('discord-akairo');
const { ids } = require('../../db/db.js');

class RestartCommand extends Command {
    constructor() {
        super('restart', {
            aliases: ['restart', 'reboot'],
            category: 'OwnerOnly'
        });
    }

    exec(msg) {
        const error = this.client.util.embed()
            .setTitle('ACCESS DENIED')
            .setAuthor('Yuga')
            .setColor(0xFF0000)
            .setDescription('You do not have access to use this command.\nThis command is exclusive to the Developer.')
            .setThumbnail(this.client.user.avatarURL())
            .setTimestamp();

        if (msg.author.id === '215509157837537280') {
            this.client.user.setActivity('yuga restart...', {
                type: 'WATCHING'
            }).then(() => {
                process.exit(69);
            });
        }

        if (~ids.indexOf(msg.author.id)) {
            console.log(`${msg.author.tag} restarted!`);
            this.client.user.setActivity('yuga restart...', {
                type: 'WATCHING'
            }).then(() => {
                process.exit(1);
            });
        } else {
            msg.channel.send({
                embed: error,
            });
        }
    }
}

module.exports = RestartCommand;