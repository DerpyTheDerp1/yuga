exports.run = (client, msg) => {
	const Discord = require('discord.js');
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

exports.help = {
	'help': {
		name: 'Poke',
		description: 'Poke anyone!',
		category: 'Fun',
		usage: 'y!poke <tag user>',
		requiredPerms: 'None'
	}
};