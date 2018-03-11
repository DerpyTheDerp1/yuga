exports.run = async (client, msg) => {
    const guild = msg.guild;
    const user = msg.mentions.users.first();
    const userID = msg.mentions.users.first().id;
    const Discord = require('discord.js');
    const denied = new Discord.MessageEmbed()
        .setTitle('ACCESS DENIED')
        .setAuthor(msg.author.tag)
        .setColor(0xFF0000)
        .setDescription('You do not have the permissions needed to use this command. Missing perms: BAN_MEMBERS')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();

    if (!msg.mentions.users.first()) return msg.reply('Must specify a user!');

    const hasban = 'BAN_MEMBERS';
    if (msg.member.hasPermission(hasban)) {
        const banMessage = await msg.channel.send('Banning user...');
        guild.member(user).ban({ days: 7 });
        await banMessage.edit('Banned and messages deleted (past 7 days)\nUnbannning');
        await banMessage.edit('Banned and messages deleted (past 7 days)\nUnbannning.');
        await banMessage.edit('Banned and messages deleted (past 7 days)\nUnbannning..');
        guild.members.unban(userID);
        await banMessage.edit('Banned and messages deleted (past 7 days)\nUnbannning...');
        await banMessage.edit('Banned and messages deleted (past 7 days)\nUnbanned!');
    } else {
        msg.channel.send({
            embed: denied,
        });
    }
};

exports.help = {
    'help': {
        name: 'Hack Ban',
        description: 'Bans a member, deleting all their messages from the last 7 days, then unbans.',
        category: 'Moderation',
        usage: 'y!hackban <tag member>',
        requiredPerms: 'Ban Members',
    },
};