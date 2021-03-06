exports.run = (client, msg) => {
    if (!msg.mentions.users.first()) return msg.reply('Must specify a user!');
    const member = msg.guild.member(msg.mentions.users.first());
    const hasban = 'BAN_MEMBERS';
    if (msg.member.hasPermission(hasban)) {
        if (member == msg.member) return msg.reply('Why are you trying to ban yourself ;-;');
        if (msg.member.roles.highest.position < member.roles.highest.position) return msg.reply('You cannot ban this user, they have a higher role than you!');
        if (msg.member.roles.highest.position == member.roles.highest.position) return msg.reply('You cannot ban this user, they have the same role as you!');
        member.ban();
        msg.channel.send(`The ban hammer :hammer: has struck on **${msg.mentions.users.first().username}**!`);
    } else {
        msg.channel.send('You cannot ban this user, you do not have the permissions to!');
    }
};

exports.help = {
    'help': {
        name: 'Ban',
        description: 'Bans a member',
        category: 'Moderation',
        usage: 'y!ban <tag member>',
        requiredPerms: 'Ban Members',
    },
};