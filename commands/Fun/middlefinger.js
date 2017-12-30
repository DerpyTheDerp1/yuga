exports.run = (client, msg) => {
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

exports.help = {
	'help': {
		name: 'Middlefinger',
		description: 'Flip off anyone!',
		category: 'Fun',
		usage: 'y!middlefinger <tag user>',
		requiredPerms: 'None'
	}
};