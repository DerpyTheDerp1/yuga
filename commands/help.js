exports.run = async(client, msg, args) => {
  const Discord = require('discord.js');
  const commandName = args.join(' ');
  if (commandName) {
    const commandHelp = require(`./${commandName}.js`)['help'];
    const help = new Discord.MessageEmbed()
      .setAuthor('Yuga')
      .setTitle(`Help for ${commandHelp.name}`)

    msg.channel.send({
      embed: help
    });
  }
  const embed = new Discord.MessageEmbed()
    .setTitle('Help Command')
    .setAuthor('Yuga')
    .setColor(0x32CD32)
    .setDescription('Yuga is a Discord Bot with many features!\nIf you wish to know the features, look down below!')
    .addField('Commands', 'y!achievement y!avatar\ny!ban y!createInvite\ny!embed y!help\ny!hug y!invite\ny!joke y!kick\ny!lenny y!memeuser \ny!middlefinger y!ping\ny!purge y!rate\ny!say y!server\ny!slap y!slots\ny!stab y!unimpressed\ny!uptime y!warn', true)
    .addField('More info', 'To find out to command usage of each command, run the command without any arguments.\nE.g y!ban <user>\n(User being the argument)\nThis method only works for commands listed as "takes arguments", the other commands return a static response.', true)
    .addField('Commands that take arguments', 'y!achievement y!avatar\ny!ban y!createInvite\ny!embed y!hug\ny!kick y!memeuser \ny!middlefinger y!purge\ny!rate y!say\ny!slap y!stab\ny!unimpressed\ny!warn', true)
    .addField('Commands that take no arguments', 'y!help y!invite\ny!joke y!lenny\ny!ping y!server\ny!slots y!uptime', true)
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();

  msg.channel.send(`${msg.author}, I have sent it to your DMs!\nI'll also send it here.`);
  await msg.author.send({
    embed
  });

  await msg.channel.send({
    embed
  });
};