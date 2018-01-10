exports.run = (client, msg, args) => {
  const Discord = require('discord.js');
  const avhelp = new Discord.MessageEmbed()
    .setTitle('Avatar Usage')
    .setAuthor('Yuga')
    .setColor(0x32CD32)
    .addField('About', 'Returns the avatar of a specified user', false)
    .addField('Usage', 'y!avatar <user mention>', false)
    .addField('Perms required', 'None')
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();

  const userr = args.join(' ');

  if (!userr) return msg.channel.send({
    embed: avhelp
  });
  const user = msg.mentions.users.first();
  const avatar = user.avatarURL({
    size: 2048
  });

  const avatarembed = new Discord.MessageEmbed()
    .setTitle(`Avatar of ${user.tag} (click here to get the avatar)`)
    .setURL(avatar)
    .setImage(avatar)
    .setTimestamp();


  msg.channel.send({
    embed: avatarembed
  });
};