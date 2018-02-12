const Discord = require('discord.js');

exports.run = async(client, msg) => {
    const denied = new Discord.MessageEmbed()
        .setTitle('ACCESS DENIED')
        .setAuthor(msg.author.tag)
        .setColor('#FF0000')
        .setDescription('You do not have the permissions needed to use this command. Missing perms: MANAGE_MESSAGES')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();
    const managemsgs = 'MANAGE_MESSAGES';
    if (msg.member.hasPermission(managemsgs)) {
        const msgs = await msg.channel.messages.fetch({
            limit: 100,
        });
        msg.channel.bulkDelete(msgs).catch(error => console.log(error.stack));
        const prune = await msg.channel.send(`${msg.author} pruned 100 messages!`);
        setTimeout(function () {
            prune.delete();
        }, 5000);
    } else {
        msg.channel.send({
            embed: denied
        });
    }
};

exports.help = {
    'help': {
        name: 'Prune',
        description: 'Deletes 100 messages at once',
        category: 'Moderation',
        usage: 'y!prune',
        requiredPerms: 'Manage Messages'
    }
};