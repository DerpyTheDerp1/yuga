let prefix = '';
const Discord = require('discord.js');
const color = require('../db/db.json').color;
const error = require('../yuga.js').error;
const fs = require('fs');

exports.run = async(client, old, msg) => {
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

    if (client.user.username == 'Yuga Testing') prefix = 'yt!';
    if (client.user.username == 'Yuga!') prefix = 'y!';
    let args = msg.content.split(' ').slice(1);
    let command = msg.content.split(' ')[0];
    command = command.slice(prefix.length);

    if (msg.author.bot) return;
    //Prefix checker #2: Edited command messages
    if (msg.content.startsWith(prefix)) {
        console.log('Command running, Handler: 2');
        msg.channel.startTyping();
        const editedlog = new Discord.MessageEmbed()
            .setTitle('**__LOG__**')
            .setColor(color)
            .addField('User', `${msg.author.tag} ID: ${msg.author.id}`)
            .addField('Command', `${msg.content}`)
            .addField('Server', `${msg.guild.name} ID: ${msg.guild.id}`)
            .setTimestamp()
            .setThumbnail(client.user.avatarURL());
        //Running Commands
        await runCommand(command)
        //End Running Commands

        //Logger
        client.channels.get('308545302615293953').send({
            embed: editedlog
        }).then(msg.channel.stopTyping());
        //Logger
    }
    //Prefix Checker #4: Mention edited
    if (msg.content.startsWith(`<@${client.user.id}>`) && msg.mentions.everyone == false) {

        content = msg.content.split(' ');
        console.log(content);


        command = content[1];
        leftovers = content.slice(2);
        args = [];
        for (i in leftovers) {
            args.push(leftovers[i]);
        }

        console.log('Command running, Handler: 4');
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
        await runCommand(command)
        //End Running Commands

        //Logger
        client.channels.get('308545302615293953').send({
            embed: log
        }).then(msg.channel.stopTyping());
        //Logger
    } else return;
};
