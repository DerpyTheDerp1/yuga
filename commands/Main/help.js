const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

exports.run = async(client, msg, args) => {
  function findCommand(cmd) {
    try {
        const CommandsFolder = fs.readdirSync('./commands');
            for (const group of CommandsFolder) {
                try {
                    commands = fs.readdirSync('./commands/' + group);
                    for (const command of commands) {
                        if (command.slice(0, -3) === cmd) {
                            return require('./commands/' + group + '/' + command);
                        }
                    }
                } catch (err) {
                    msg.reply(`An error occured!\n${err.message}\nPlease check spelling of command, otherwise contact Striker#7250!`)
                }
            }
        } catch (err) {
            console.error(err);
        }
  }

  let prefix = '';
  if (client.user.username == 'Yuga!') prefix = 'y!';
  if (client.user.username == 'Yuga Testing') prefix == 'yt!';
  const cmdName = args.join(' ');
  if (cmdName) {
    const cmdHelp = findCommand(cmdName)['help'];
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
    const ExclusiveCommands = fs.readdirSync('./commands/Exclusive').map(file => path.basename(file, path.extname(file)));
    const FunCommands = fs.readdirSync('./commands/Fun').map(file => path.basename(file, path.extname(file)));
    const MainCommands = fs.readdirSync('./commands/Main').map(file => path.basename(file, path.extname(file)));
    const ModerationCommands = fs.readdirSync('./commands/Moderation').map(file => path.basename(file, path.extname(file)));
    const UtilityCommands = fs.readdirSync('./commands/Utility').map(file => path.basename(file, path.extname(file)));
    const embed = new Discord.MessageEmbed()
      .setTitle('Help Command')
      .setAuthor(client.user.username)
      .setColor('#32CD32')
      .setDescription('Yuga is a Discord Bot with many features!\nIf you wish to know the features, look down below!')
      .addField('Main Commands', MainCommands, true)
      .addField('Fun Commands', FunCommands, true)
      .addField('Moderation Commands', ModerationCommands, true)
      .addField('Utility Commands', UtilityCommands, true)
      .addField('Exclusive Commands', ExclusiveCommands, true)
      .addField('More info', `To find out extensive usage per command, use ${prefix}help <command name>.\nThis will tell you the command description, usage, and what perms you need to run it. `, true)
      .setThumbnail(client.user.avatarURL())
      .setTimestamp();

    msg.reply('I have sent it to your DMs!');
    await msg.author.send({
      embed
    });
  }

};
