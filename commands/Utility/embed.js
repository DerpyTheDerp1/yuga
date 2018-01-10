const Discord = require('discord.js');

exports.run = (client, msg, args) => {

    const embedh = new Discord.MessageEmbed()
        .setTitle('Embed Usage')
        .setAuthor('Yuga')
        .setColor('#32CD32')
        .addField('About', 'Creates an embed, rich or not', false)
        .addField('Usage', 'y!embed Standard | <title> | <description>\ny!embed Rich | <title> | <description> | <thumbnail image link>', false)
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();


    const randomcolor = Math.floor(Math.random() * (10000000 - 1 + 1)) + 1;

    const [embedchoice, title, description, thumbnail, ] = args.join(' ').split(' | ');

    if (embedchoice == 'Rich') {
        const embed = new Discord.MessageEmbed()
            .setTitle(title)
            .setAuthor(msg.author.tag)
            .setColor(randomcolor)
            .setDescription(description)
            .setThumbnail(thumbnail);

        msg.channel.send({
            embed
        });
    }

    if (embedchoice == 'Standard') {
        msg.channel.send({
            embed: {
                description: description,
                color: randomcolor
            }
        });
    }

    if (!embedchoice) {
        msg.channel.send({
            embed: embedh
        });
    }
};