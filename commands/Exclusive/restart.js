exports.run = (client, msg, args) => {
    let guild = client.guilds.get(msg.guild.id)
    const db = require('../db/db.json')
    const ids = db.ids
    const Discord = require('discord.js')
    const error = new Discord.MessageEmbed()
        .setTitle('ACCESS DENIED')
        .setAuthor('Yuga')
        .setColor(0xFF0000)
        .setDescription('You do not have access to use this command.\nThis command is exclusive to the Developer.')
        .setFooter(`Striker's Bots 2017©`)
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()

    if (msg.author.id === '215509157837537280') {
        process.exit(1)
    }

    if (~ids.indexOf(msg.author.id)) {
        process.exit(1)

    } else {
        msg.channel.send({
            embed: error
        })
    }

}