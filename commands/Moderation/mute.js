const { MessageEmbed } = require('discord.js');

exports.run = (client, msg) => {
    const denied = new MessageEmbed()
        .setTitle('ACCESS DENIED')
        .setAuthor(msg.author.tag)
        .setColor(0xFF0000)
        .setDescription('You do not have the permissions needed to use this command. Missing perms: KICK_MEMBERS')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();
    const haskick = 'KICK_MEMBERS';

    if (!msg.mentions.users.first()) return msg.reply('Must specify a user!');
    if (msg.member.hasPermission(haskick)) {
        const user = msg.mentions.users.first();
        const guild = msg.guild;
        let mutedRole = guild.roles.find('name', 'Muted');
        if (!mutedRole) {
            mutedRole = guild.roles.create({
                data: {
                    name: 'Muted',
                    color: 'BLACK',
                },
                reason: 'Muted role non existent',
            });
        }
        guild.channels.filter(c => !c.permissionOverwrites.exists('id', mutedRole.id)).forEach((channels) => {
            channels.overwritePermissions(mutedRole.id, {
                SEND_MESSAGES: false,
            });
        });
        guild.member(user).roles.add(mutedRole);

        msg.delete();
        msg.channel.send(`Muted ${user} successfully.`);
    } else {
        msg.channel.send({
            embed: denied,
        });
    }
};


exports.help = {
    'help': {
        name: 'Mutes',
        description: 'Mutes a member',
        category: 'Moderation',
        usage: 'y!mute <tag user>',
        requiredPerms: 'Kick Members',
    },
};