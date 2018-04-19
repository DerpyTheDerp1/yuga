exports.run = (client, msg) => {
    const { ids } = require('../../db/db.js');
    const Discord = require('discord.js');
    const error = new Discord.MessageEmbed()
        .setTitle('ACCESS DENIED')
        .setAuthor('Yuga')
        .setColor(0xFF0000)
        .setDescription('You do not have access to use this command.\nThis command is exclusive to the Developer.')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();

    if (msg.author.id === '215509157837537280') {
        client.user.setActivity('yuga restart...', {
            type: 'WATCHING'
        }).then(() => {
            process.exit(69);
        });
    }

    if (~ids.indexOf(msg.author.id)) {
        console.log(`${msg.author.tag} restarted!`);
        client.user.setActivity('yuga restart...', {
            type: 'WATCHING'
        }).then(() => {
            process.exit(1);
        });
    } else {
        msg.channel.send({
            embed: error,
        });
    }
};