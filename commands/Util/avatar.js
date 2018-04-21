const { Command } = require('discord-akairo');

class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
                category: 'Util',
                aliases: ['avatar'],
                args: [
                {
                    id: 'member',
                    type: 'member'
                }]
            }),

            this.help = {
                'help': {
                    name: 'Avatar',
                    description: 'Returns the avatar of a specified user',
                    category: 'Utility',
                    usage: 'y!avatar <tag user>',
                    requiredPerms: 'None',
                }
            };
    }

    exec(msg, args) {
        let user = args.member;
        if (!user) user = msg.author;
        const avatar = user.avatarURL({
            size: 2048,
        });

        const avatarembed = this.client.util.embed()
            .setTitle(`Avatar of ${user.tag} (click here to get the avatar)`)
            .setURL(avatar)
            .setImage(avatar)
            .setTimestamp();

        msg.channel.send({
            embed: avatarembed,
        });
    }
}

module.exports = AvatarCommand;