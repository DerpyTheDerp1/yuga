const { Listener } = require('discord-akairo');

class guildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    exec(member) {
        const guild = member.guild;
        const channel = guild.channels.find('name', 'yuga-welcome');
        if (!channel) return;
        channel.send(`Welcome to ${guild.name}, ${member}!`);
        const memberRole = guild.roles.find('name', 'Member');
        if (memberRole) member.addRole(memberRole.id);
        if (!memberRole) return;
    }
}

module.exports = guildMemberAddListener;