exports.run = (client, msg, args) => {
    function makeid() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    const Discord = require('discord.js');
    const guild = client.guilds.get(msg.guild.id);
    const denied = new Discord.MessageEmbed()
        .setTitle('ACCESS DENIED')
        .setAuthor(msg.author.tag)
        .setColor('#FF0000')
        .setDescription('You do not have the permissions needed to use this command. Missing perms: KICK_MEMBERS')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();

    const [user, reason] = args.join(' ').split(' | ');
    if (!user && !reason) return msg.reply('Command cannot be ran like this, problem between keyboard and chair.');

    if (!user) return msg.reply('Please specify a user!');

    if (!reason) return msg.reply('Please specify a reason!');

    const modavatar = msg.author.avatarURL();
    const mod = msg.author.tag;
    const haskick = 'KICK_MEMBERS';
    const userr = msg.mentions.users.first();
    const usertag = userr.tag;
    const useravatar = userr.avatarURL();
    const warningchannel = guild.channels.find('name', 'yuga-warnings');

    if (msg.member.hasPermission(haskick)) {
        if (!warningchannel) return guild.createChannel('yuga-warnings');
        const casenum = makeid();
        const warnembed = new Discord.MessageEmbed()
            .setTitle(`CASE ${casenum}`)
            .setColor(0xFF0000)
            .setDescription('A new warning has been given out!')
            .addField('USER', `${usertag}`)
            .addField('MOD', `${mod}`)
            .addField('REASON', `${reason}`)
            .setImage(useravatar)
            .setThumbnail(modavatar)
            .setTimestamp();
        warningchannel.send({
            embed: warnembed
        });
    } else {
        msg.channel.send({
            embed: denied
        });
    }

};

exports.help = {
    'help': {
        name: 'Warn',
        description: 'Issues a warning for a user',
        category: 'Moderation',
        usage: 'y!warn <tag user> | <reason>',
        requiredPerms: 'Kick Members'
    }
};