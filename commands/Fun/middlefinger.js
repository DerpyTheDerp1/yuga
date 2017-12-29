exports.run = (client, msg, args) => {
	const Discord = require('discord.js');
	const mfhelp = new Discord.MessageEmbed()
		.setTitle('Middle Finger Usage')
		.setAuthor('Yuga')
		.setColor(0x32CD32)
		.addField('About', 'Flipping off the haters', false)
		.addField('Usage', 'y!middlefinger <tag user>', false)
		.addField('Perms required', 'None')
		.setThumbnail(client.user.avatarURL())
		.setTimestamp();
	const arg = args.join(' ');

	if (!arg) {
		msg.channel.send({
			embed: mfhelp
		});
	}
	const fingah = 'https://media.giphy.com/media/QGzPdYCcBbbZm/giphy.gif';
	const author = msg.author.username;

	const middleperson = msg.mentions.users.first();
	const person = middleperson.username;

	const finger = new Discord.MessageEmbed()
		.setTitle(`${person}, you got the middle finger from **${author}**!`)
		.setImage(fingah)
		.setColor(0xff0000);

	msg.channel.send({
		embed: finger
	});
};