const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

exports.run = async (client, msg, args) => {
  const findCommand = (cmd) => {
    try {
      const CommandsFolder = fs.readdirSync('./commands');
      for (const group of CommandsFolder) {
        try {
          const commands = fs.readdirSync('./commands/' + group);
          for (const command of commands) {
            if (command.slice(0, -3) === cmd) {
              return require('../' + group + '/' + command);
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      msg.reply(`An error occured!\n\`\`\`${err.message}\`\`\`\nPlease check spelling of command, otherwise contact Striker#1337!`);
    }
  };

  let prefix = '';
  if (client.user.username == 'Yuga!') prefix = 'y!';
  if (client.user.username == 'Yuga Testing') prefix == 'yt!';
  const cmdName = args.join(' ');
  if (cmdName) {
    const cmdHelp = findCommand(cmdName).help['help'];
    const help = new Discord.MessageEmbed()
      .setAuthor(client.user.username)
      .setTitle(`__Help for ${cmdHelp.name}__`)
      .setColor('#32CD32')
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .addField('Description', cmdHelp.description)
      .addField('Category', cmdHelp.category)
      .addField('Usage', cmdHelp.usage)
      .addField('Required Perms', cmdHelp.requiredPerms);
    msg.channel.send({
      embed: help,
    });
  } else {
    const FunCommands = fs.readdirSync('./commands/Fun').map(file => path.basename(file, path.extname(file)));
    const MainCommands = fs.readdirSync('./commands/Main').map(file => path.basename(file, path.extname(file)));
    const ModerationCommands = fs.readdirSync('./commands/Moderation').map(file => path.basename(file, path.extname(file)));
    const UtilityCommands = fs.readdirSync('./commands/Utility').map(file => path.basename(file, path.extname(file)));
    const NSFWCommands = fs.readdirSync('./commands/NSFW').map(file => path.basename(file, path.extname(file)));
    const embed = new Discord.MessageEmbed()
      .setTitle('Help Command')
      .setAuthor(client.user.username)
      .setColor('#32CD32')
      .addField('Main Commands', MainCommands, true)
      .addField('Fun Commands', FunCommands, true)
      .addField('Moderation Commands', ModerationCommands, true)
      .addField('Utility Commands', UtilityCommands, true)
      .addField('NSFW Commands', NSFWCommands, true)
      .addField('More info', `To find out extensive usage per command, use ${prefix}help <command name>.\nThis will tell you the command description, usage, and what perms you need to run it.\nNSFW commands can only be used in NSFW Labelled channels.`, true)
      .setThumbnail(client.user.avatarURL())
      .setTimestamp();

    msg.reply('I have sent it to your DMs!');
    await msg.author.send({
      embed,
    });
  }
};
