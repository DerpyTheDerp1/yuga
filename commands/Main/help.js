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
            }]
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
                                return require('../' + group + '/' + command);
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

        let prefix = '';
        if (this.client.user.username == 'Yuga!') prefix = 'y!';
        if (this.client.user.username == 'Yuga Testing') prefix == 'yt!';
        const cmdName = args.cmdName;
        if (cmdName) {
            const cmdHelp = findCommand(cmdName).help['help'];
            const help = this.client.util.embed()
                .setAuthor(this.client.user.username)
                .setTitle(`__Help for ${cmdHelp.name}__`)
                .setColor('#32CD32')
                .setThumbnail(this.client.user.avatarURL())
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
            const embed = this.client.util.embed()
                .setTitle('Help Command')
                .setAuthor(this.client.user.username)
                .setColor('#32CD32')
                .addField('Main Commands', MainCommands, true)
                .addField('Fun Commands', FunCommands, true)
                .addField('Moderation Commands', ModerationCommands, true)
                .addField('Utility Commands', UtilityCommands, true)
                .addField('NSFW Commands', NSFWCommands, true)
                .addField('More info', `To find out extensive usage per command, use ${prefix}help <command name>.\nThis will tell you the command description, usage, and what perms you need to run it.\nNSFW commands can only be used in NSFW Labelled channels.`, true)
                .setThumbnail(this.client.user.avatarURL())
                .setTimestamp();

            msg.reply('I have sent it to your DMs!');
            await msg.author.send({
                embed,
            });
        }
    }
}

module.exports = HelpCommand;