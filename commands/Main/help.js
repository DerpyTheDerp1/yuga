const { Command } = require('discord-akairo');
const path = require('path');
const fs = require('fs');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'halp'],
            args: [
            {
                id: 'cmdName',
                type: 'string'
            }],
            typing: true
        });
    }
    async exec(msg, args) {
        const findCommand = (cmd) => {
            try {
                const CommandsFolder = fs.readdirSync('./commands');
                for (const group of CommandsFolder) {
                    try {
                        const commands = fs.readdirSync('./commands/' + group);
                        for (const command of commands) {
                            if (command.slice(0, -3) === cmd) {
                               const c = require('../' + group + '/' + command);
                               const comm = new c();
                               return comm;
                            }
                        }
                    } catch (err) {
                        msg.reply(`An error occured!\n\`\`\`${err.message}\`\`\`\nPlease check spelling of command, otherwise contact Striker#1337!`);
                    }
                }
            } catch (err) {
                msg.reply(`An error occured!\n\`\`\`${err.message}\`\`\`\nPlease check spelling of command, otherwise contact Striker#1337!`);
            }
        };

        const cmdName = args.cmdName;
        if (cmdName) {
            const cmdHelp = findCommand(cmdName).help['help'];
            if (cmdHelp) {
                const help = this.client.util.embed()
                    .setAuthor(this.client.user.username)
                    .setTitle(`__Help for ${cmdHelp.name}__`)
                    .setColor('#32CD32')
                    .setThumbnail(this.client.user.avatarURL())
                    .setTimestamp()
                    .addField('Description', cmdHelp.description)
                    .addField('Category', cmdHelp.category)
                    .addField('Usage', cmdHelp.usage)
                    .addField('Aliases', cmdHelp.aliases)
                    .addField('Can be used in DMs?', cmdHelp.DMs)
                    .addField('Required Perms', cmdHelp.requiredPerms);
                return msg.channel.send({
                    embed: help,
                });
            } else {
                return msg.reply('Sorry, that command doesn\'t exist');
            }
        } else {
            const FunCommands = fs.readdirSync('./commands/Fun').map(file => path.basename(file, path.extname(file)));
            const MainCommands = fs.readdirSync('./commands/Main').map(file => path.basename(file, path.extname(file)));
            const ModerationCommands = fs.readdirSync('./commands/Moderation').map(file => path.basename(file, path.extname(file)));
            const UtilCommands = fs.readdirSync('./commands/Util').map(file => path.basename(file, path.extname(file)));
            const NSFWCommands = fs.readdirSync('./commands/NSFW').map(file => path.basename(file, path.extname(file)));
            await msg.author.send(`\`\`\`=== Main Commands ===\n${MainCommands}\`\`\``);
            await msg.author.send(`\`\`\`=== Moderation Commands ===\n${ModerationCommands}\`\`\``);
            await msg.author.send(`\`\`\`=== Fun Commands ===\n${FunCommands}\`\`\``);
            await msg.author.send(`\`\`\`=== Util Commands ===\n${UtilCommands}\`\`\``);
            await msg.author.send(`\`\`\`=== NSFW Commands ===\n${NSFWCommands}\`\`\``);
            return msg.reply('I have sent it to your DMs!');
        }
    }
}

module.exports = HelpCommand;