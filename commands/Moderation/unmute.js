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
        const mutedRole = guild.roles.find('name', 'Muted');
        if (!mutedRole) return;
        if (!guild.member(user).roles.exists('name', 'Muted')) return msg.reply('They cannot be unmuted, they were never muted.');
        guild.member(user).roles.remove(mutedRole);
        msg.delete;
        msg.channel.send(`Unmuted ${user} successfully!`);
    } else {
        msg.channel.send({
            embed: denied
        });
    }
};
exports.help = {
    'help': {
        name: 'Unmute',
        description: 'Unmutes an already muted member',
        category: 'Moderation',
        usage: 'y!unmute <tag user>',
        requiredPerms: 'Kick Members'
    }
};