const { Listener } = require('discord-akairo');

class guildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    exec(member) {
        const guild = member.guild;
        const channel = guild.channels.find('name', 'yuga-welcome') ;
        if (!channel) return;
        channel.send(`Welcome to ${guild.name}, ${member}!`);
    }
}

module.exports = guildMemberRemoveListener;