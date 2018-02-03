let prefix = '';
const fs = require('fs');
const Discord = require('discord.js');
const {
    color
} = require('../db/db.js');
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
                console.error(err);
            }
        }
    } catch (err) {
        msg.reply(`An error occured!\n\`\`\`${err.message}\`\`\`\nPlease check spelling of command, otherwise contact Striker#7250!`);
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
    client.channels.get('308545302615293953').send({
        embed: log
    }).then(() => msg.channel.stopTyping());
};

exports.run = async(client, old, msg) => {
    if (client.user.username == 'Yuga Testing') {
        prefix = 'yt!';
    }

    if (client.user.username == 'Yuga!') {
        prefix = 'y!';
    }

    let args = msg.content.split(' ').slice(1);
    command = msg.content.split(' ')[0];

    if (msg.channel.type == 'dm' || !msg.guild) return;
    if (msg.author.bot) return;
    //Prefix checker #2: Edited command messages
    if (msg.content.startsWith(prefix)) {
        command = command.slice(prefix.length);
        runCommand(client, msg, command, args);
        cmdLogger(client, msg, '2');
    }

    //Prefix checker #4: Mentions
    if (msg.content.startsWith(`<@${client.user.id}>`) && msg.mentions.everyone == false) {
        const content = msg.content.split(' ');
        command = content[1];

        const leftovers = content.slice(2);
        args = [];
        for (const i in leftovers) {
            args.push(leftovers[i]);
        }
        runCommand(client, msg, command, args);
        cmdLogger(client, msg, '4');
    } else return;
};