const fs = require('fs');
const Discord = require('discord.js');
const { color } = require('../db/db.js');
let command = '';
const runCommand = (client, msg, cmd, args) => {
    try {
        const CommandsFolder = fs.readdirSync('./commands');
        for (const group of CommandsFolder) {
            try {
                const commands = fs.readdirSync('./commands/' + group);
                for (const comman of commands) {
                    if (comman.slice(0, -3) === cmd) {
                        const commandFile = require(`../commands/${group}/${comman}`);
                        return commandFile.run(client, msg, args);
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

const cmdLogger = (client, msg, handlerNo) => {
    console.log(`Command running, Handler: ${handlerNo}`);
    msg.channel.startTyping();
    const log = new Discord.MessageEmbed()
        .setTitle('**__LOG__**')
        .setColor(color)
        .addField('User', `${msg.author.tag} ID: ${msg.author.id}`)
        .addField('Command', `${msg.content}`)
        .addField('Server', `${msg.guild.name} ID: ${msg.guild.id}`)
        .setTimestamp()
        .setThumbnail(client.user.avatarURL());
    client.channels.get('428587939958882304').send({
        embed: log,
    });
    msg.channel.stopTyping(true);
};

exports.run = (client, msg) => {
    let prefix = '';
    if (client.user.username == 'Yuga Testing') {
        prefix = 'yt!';
    }

    if (client.user.username == 'Yuga!') {
        prefix = 'y!';
    }

    let args = msg.content.split(' ').slice(1);
    command = msg.content.split(' ')[0];
    // Checking if it's a bot speaking & ignores it
    if (msg.author.bot) return;

    // Checking if commands are in DMs or msg.guild is undefined.
    if (msg.channel.type == 'dm' || !msg.guild) return;

    // Prefix Checker #1: Command Only
    if (msg.content.startsWith(prefix)) {
        command = command.slice(prefix.length);
        runCommand(client, msg, command, args);
        cmdLogger(client, msg, '1');
    }

    // Prefix checker #3: Mentions
    if (msg.content.startsWith(`<@${client.user.id}>`) && msg.mentions.everyone == false) {
        const content = msg.content.split(' ');
        command = content[1];

        const leftovers = content.slice(2);
        args = [];
        for (const i in leftovers) {
            args.push(leftovers[i]);
        }
        runCommand(client, msg, command, args);
        cmdLogger(client, msg, '3');
    } else return;
    // Code to do nothing if there is no prefix. All other messages are ignored thus.
};