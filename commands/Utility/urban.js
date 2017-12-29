urban = require('urban.js');
const Discord = require('discord.js')
const color = require('../db/db.json').color;

exports.run = async (client, msg, args) => {
    let guild = msg.guild
    let word = args.join(' ')
    
    try {
        let d = await urban(word)
        let tags = d.tags.join(', ')
        let author = d.author
        let definition = d.definition
        let example = d.example
        let worrd = d.word
        if (!author) author = 'NA'
        if (!tags) tags = 'none'
        if (!definition) definition = 'none'
        if (!example) example = 'none'
        if (worrd) worrd = word
        let defembed = new Discord.MessageEmbed()
            .setAuthor(`Definition by ${author}`)
            .addField('__WORD__', worrd)
            .addField('__DEFINITION__', definition)
            .addField('__EXAMPLE__', example)
            .addField('__TAGS__', tags)
            .addField(`__URL__`, `Click **[here](${d.URL})** to access the Urban Dictionary page`)
            .setColor(color)
            .setTimestamp()
            .setThumbnail(client.user.avatarURL())
        msg.channel.send({
            embed: defembed
        })
    } catch (err) {
        msg.channel.send(`Sorry, your search could not be completed. Error: ${err.message}`)
    }
}