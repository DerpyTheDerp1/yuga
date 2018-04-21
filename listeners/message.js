const { Listener } = require('discord-akairo');
const { color } = require('../../db/db.js');

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    exec(msg) {
        if (msg.guild.id == '264445053596991498') return;
        if (msg.author.bot) return;
        msg.channel.startTyping();
        const log = this.client.util.embed()
            .setTitle('**__LOG__**')
            .setColor(color)
            .addField('User', `${msg.author.tag} ID: ${msg.author.id}`)
            .addField('Command', `${msg.content}`)
            .addField('Server', `${msg.guild.name} ID: ${msg.guild.id}`)
            .setTimestamp()
            .setThumbnail(this.client.user.avatarURL());
        this.client.channels.get('428587939958882304').send({
            embed: log,
        }).then(() => msg.channel.stopTyping(true));
    }
}

module.exports = MessageListener;