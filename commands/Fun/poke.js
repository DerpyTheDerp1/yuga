exports.run = (client, msg, args) => {
	const Discord = require('discord.js');
	const pokehelp = new Discord.MessageEmbed()
		.setTitle('Poke Usage')
		.setAuthor('Yuga')
		.setColor(0x32CD32)
		.addField('About', 'When you want attention', false)
		.addField('Usage', 'y!poke <tag user>', false)
		.addField('Perms required', 'None')
		.setThumbnail(client.user.avatarURL())
		.setTimestamp();
	const arg = args.join(' ');

	if (!arg) {
		msg.channel.send({
			embed: pokehelp
		});
	}
	const poke = 'https://media.giphy.com/media/jCENc3aA4fLJm/giphy.gif';
	const author = msg.author.username;

	const pokeperson = msg.mentions.users.first();
	const person = pokeperson.username;

	const poked = new Discord.MessageEmbed()
		.setTitle(`${person}, you got poked by **${author}**!`)
		.setImage(poke)
		.setColor(0xff0000);

	msg.channel.send({
		embed: poked
	});
};