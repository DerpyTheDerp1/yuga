exports.run = (client, msg, args) => {
  let argresult = args.join(' ')
  let guild = client.guilds.get(msg.guild.id)

  const Discord = require('discord.js')
  const error = new Discord.MessageEmbed()
    .setTitle('ACCESS DENIED')
    .setAuthor(msg.author.tag)
    .setColor('#FF0000')
    .setDescription('You do not have access to use this command.\nThis command is exclusive to the Developer.')
    .setFooter(`Striker's Bots 2017© | `)
    .setThumbnail(client.user.avatarURL())
    .setTimestamp()

  const success = new Discord.MessageEmbed()
    .setTitle('SUCCESS')
    .setAuthor(msg.author.tag)
    .setColor('#008000')
    .setDescription('Command success!')
    .setFooter(`Striker's Bots 2017© | `)
    .setThumbnail(client.user.avatarURL())
    .setTimestamp()


  if (msg.author.id !== '215509157837537280') {
    msg.channel.send({
      embed: error
    })
  } else {
    client.user.setPresence({
      game: {
        name: `y!help | In ${client.guilds.size} servers | ${argresult}`,
        type: 0
      }
    })
    msg.channel.send({
      embed: success
    })

  }
}