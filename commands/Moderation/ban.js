const { Command } = require('discord-akairo');

class BanCommand extends Command {
    constructor() {
        super('ban', {
                aliases: ['ban'],
                userPermissions: ['BAN_MEMBERS'],
                clientPermissions: ['BAN_MEMBERS'],
                args: [
                {
                    id: 'member',
                    type: 'member'
                }],
                channel: 'guild',
                typing: true
            }),

            this.help = {
                'help': {
                    name: 'Ban',
                    description: 'Bans a member',
                    category: 'Moderation',
                    usage: 'y!ban <tag member>',
                    requiredPerms: 'Ban Members'
                }
            };
    }

    exec(msg, args) {
        if (!args.member) return msg.reply('Must specify a user!');
        const member = args.member;
        if (member == msg.member) return msg.reply('Why are you trying to ban yourself ;-;');
        if (msg.member.roles.highest.position < member.roles.highest.position) return msg.reply('You cannot ban this user, they have a higher role than you!');
        if (msg.member.roles.highest.position == member.roles.highest.position) return msg.reply('You cannot ban this user, they have the same role as you!');
        member.ban();
        return msg.channel.send(`The ban hammer :hammer: has struck on **${member.user.username}**`);
    }
}

module.exports = BanCommand;