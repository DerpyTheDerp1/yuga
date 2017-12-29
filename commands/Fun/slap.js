exports.run = (client, msg, args) => {
  const Discord = require('discord.js')
	const slaphelp = new Discord.MessageEmbed()
    .setTitle('Slap Usage')
    .setAuthor('Yuga')
    .setColor(0x32CD32)
    .addField('About', 'Slap em!', false)
    .addField('Usage', 'y!slap <tag user>', false)
    .addField('Perms required', 'None')
    .setThumbnail(client.user.avatarURL())
    .setTimestamp()
	let arg = args.join(' ')

	if (!arg) return msg.channel.send({embed:slaphelp})
	
  let slap = 'http://striker.demoted.me/6502.gif'
  let author = msg.author.username
 
  let slappedperson = msg.mentions.users.first()
   let person = slappedperson.username
   
   const slapped = new Discord.MessageEmbed()
     .setTitle(`${person}, you got slapped by **${author}**!`)
     .setImage(slap)
     .setColor(0xff0000)
   
     msg.channel.send({embed:slapped})
}
