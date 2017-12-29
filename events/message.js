let prefix = '';
const Discord = require('discord.js');
const color = require('../db/db.json').color;
const error = require('../yuga.js').error;
const fs = require('fs');

exports.run = async(client, msg) => {
    function runCommand(cmd) {
        try {
            const CommandsFolder = fs.readdirSync('./commands');
            for (const group of CommandsFolder) {
                try {
                    commands = fs.readdirSync('./commands/' + group);
                    for (const command of commands) {
                        if (command.slice(0, -3) === cmd) {
                            commandFile = require('../commands/' + group + '/' + command);
                            commandFile.run(client, msg, args);
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    let args = msg.content.split(' ').slice(1);
    let command = msg.content.split(' ')[0];
    if (client.user.username == 'Yuga Testing') prefix = 'yt!';
    if (client.user.username == 'Yuga!') prefix = 'y!';
    //Checking if it's a bot speaking & ignores it
    if (msg.author.bot) return;

    //Checking if commands are in DMs or msg.guild is undefined.
    if (msg.content.startsWith(prefix) && msg.channel.type === 'dm' || !msg.guild) {
        const content = msg.content;
        console.log(`${msg.author.username}#${msg.author.discriminator} tried to DM me`);
        console.log(`Contents: ${content}`);
        msg.channel.send('You cannot use this command in DM, try sending this in a server.');
        //End
    }

    //Prefix Checker #1: Command Only
    if (msg.content.startsWith(prefix)) {
        command = command.slice(prefix.length);
        console.log('Command running, Handler: 1');
        msg.channel.startTyping();
        const log = new Discord.MessageEmbed()
            .setTitle('**__LOG__**')
            .setColor(color)
            .addField('User', `${msg.author.tag} ID: ${msg.author.id}`)
            .addField('Command', `${msg.content}`)
            .addField('Server', `${msg.guild.name} ID: ${msg.guild.id}`)
            .setTimestamp()
            .setThumbnail(client.user.avatarURL());
        //Running Commands
      await runCommand(command);
        //End Running Commands

        //Logger
        client.channels.get('308545302615293953').send({
            embed: log
        }).then(msg.channel.stopTyping());
        //Logger 
    }

    //Prefix checker #3: Mentions
    if (msg.content.startsWith(`<@${client.user.id}>`) && msg.mentions.everyone == false) {

        content = msg.content.split(' ');
        command = content[1];
        leftovers = content.slice(2);
        args = [];
        for (i in leftovers) {
            args.push(leftovers[i]);
        }

        console.log('Command running, Handler: 3');
        msg.channel.startTyping();
        const log = new Discord.MessageEmbed()
            .setTitle('**__LOG__**')
            .setColor(color)
            .addField('User', `${msg.author.tag} ID: ${msg.author.id}`)
            .addField('Command', `${msg.content}`)
            .addField('Server', `${msg.guild.name} ID: ${msg.guild.id}`)
            .setTimestamp()
            .setThumbnail(client.user.avatarURL());
        //Running Commands
       await runCommand(command);
        //End Running Commands

        //Logger
        client.channels.get('308545302615293953').send({
            embed: log
        }).then(msg.channel.stopTyping());
        //Logger
    } else return;
    //Code to do nothing if there is no prefix. All other messages are ignored thus.
};
