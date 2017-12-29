exports.run = (client, msg, args) => {
	const Discord = require('discord.js');
	const stabhelp = new Discord.MessageEmbed()
		.setTitle('stab Usage')
		.setAuthor('Yuga')
		.setColor(0x32CD32)
		.addField('About', 'Ouch...', false)
		.addField('Usage', 'y!stab <tag user>', false)
		.addField('Perms required', 'None')
		.setThumbnail(client.user.avatarURL())
		.setTimestamp();
	const arg = args.join(' ');

	if (!arg) {
		msg.channel.send({
			embed: stabhelp
		});
	}
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