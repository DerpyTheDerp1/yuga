exports.run = (client, msg) => {
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
        msg.guild.member(msg.mentions.users.first()).ban();
        msg.reply(`The ban hammer :hammer: has struck on **${msg.mentions.users.first().username}**!`);
    } else {
        msg.channel.send({
            embed: denied
        });
    }

};

exports.help = {
    'help': {
        name: 'Ban',
        description: 'Bans a member',
        category: 'Moderation',
        usage: 'y!ban <tag member>',
        requiredPerms: 'Ban Members'
    }
};