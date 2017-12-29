const Discord = require('discord.js');
const fs = require('fs');

exports.run = async(client, msg, args) => {
  let prefix = '';
  if (client.user.username == 'Yuga!') prefix = 'y!';
  if (client.user.username == 'Yuga Testing') prefix == 'yt!';
  const cmdName = args.join(' ');
  if (cmdName) {
    const cmdHelp = require(`./${cmdName}.js`)['help'];
    const help = new Discord.MessageEmbed()
      .setAuthor(client.user.username)
      .setTitle(`__Help for ${cmdHelp.name}__`)
      .setColor('#32CD32')
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .addField('Description', cmdHelp.descriptione)
      .addField('Usage', cmdHelp.usage)
      .addField('Required Perms', cmdHelp.requiredPerms);
    msg.channel.send({
      embed: help
    });
  } else {
    let commands = [];
   const files = fs.readdirSync(__dirname);
      files.forEach(file => {
        commands.push(file);
      });
    commands = commands.toString();
    commands = commands.split('\n');
    const embed = new Discord.MessageEmbed()
      .setTitle('Help Command')
      .setAuthor(client.user.username)
      .setColor('#32CD32')
      .setDescription('Yuga is a Discord Bot with many features!\nIf you wish to know the features, look down below!')
      .addField('Commands', commands, true)
      .addField('More info', `To find out extensive usage per command, use ${prefix}help <command name>.\nThis will tell you the command description, usage, and what perms you need to run it. `, true)
      .setThumbnail(client.user.avatarURL())
      .setTimestamp();

    msg.reply('I have sent it to your DMs!');
    await msg.author.send({
      embed
    });
  }

};