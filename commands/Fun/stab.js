exports.run = (client, msg) => {
	const Discord = require('discord.js');
	const stab = 'https://media.giphy.com/media/xUySTCy0JHxUxw4fao/giphy.gif';
	const author = msg.author.username;

	const stabperson = msg.mentions.users.first();
	const person = stabperson.username;

	const stabbed = new Discord.MessageEmbed()
		.setTitle(`${person}, you got stabbed by **${author}**!`)
		.setImage(stab)
		.setColor(0xff0000);

	msg.channel.send({
		embed: stabbed
	});
};

exports.help = {
	'help': {
		name: 'Stab',
		description: 'OOF!',
		category: 'Fun',
		usage: 'y!stab <tag user>',
		requiredPerms: 'None'
	}
};