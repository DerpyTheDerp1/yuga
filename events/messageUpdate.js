const prefix = 'y!';
const Discord = require('discord.js');
const color = require('../db/db.json').color;
const db = require('quick.db');

exports.run = async (client, old, msg) => {
    function error(err) {
        const errorembed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('New Error Caught!')
            .setTimestamp()
            .setDescription(`\`\`\`xl\n${err.stack}\`\`\``);
        client.channels.get('385485532458778626').send({
            embed: errorembed
        });
    }

    let args = msg.content.split(' ').slice(1);
    let command = msg.content.split(' ')[0];
    command = command.slice(prefix.length);
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
        try {
            const commandFile = require(`../commands/${command}.js`);
            commandFile.run(client, msg, args);
        } catch (err) {
            error(err);
            msg.reply(`Command execution failed!\n Error: ${err.message}\nCheck spelling of command, edit your message if you can.\nIf the error seems unusual, message @Striker#7250, or join the server and ask for help.\nPlease, post your error so we know what we're dealing with here :)`);
            msg.channel.stopTyping();
        }
        //End Running Commands

        //Logger
        client.channels.get('308545302615293953').send({
            embed: editedlog
        }).then(msg.channel.stopTyping());
        //Logger
    }
    //Prefix Checker #4: Mention edited
     if (msg.mentions.users.first().contains(client.user.id) && !msg.mentions.everyone) {

        content = msg.content.split(' ');
        console.log(content)


        command = content[1]
        leftovers = content.slice(2)
        args = []
        for (i in leftovers) {
            args.push(leftovers[i])
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
        try {
            const commandFile = require(`../commands/${command}.js`);
            commandFile.run(client, msg, args);
        } catch (err) {
            msg.reply(`Command execution failed!\n Error: ${err.message}\nCheck spelling of command, edit your message if you can.\nIf the error seems unusual, message @Striker#7250, or join the server and ask for help.\nPlease, post your error so we know what we're dealing with here :)`);
            error(err);
            msg.channel.stopTyping();
        }
        //End Running Commands

        //Logger
        client.channels.get('308545302615293953').send({
            embed: log
        }).then(msg.channel.stopTyping());
        //Logger
    }

    const p = await db.fetchObject(msg.guild.id);
    if (!p.text) return;

    //Command Handler #6: Custom Prefixes
     if (msg.content.startsWith(p.text)) {
        command = command.slice(p.text.length);
        console.log('Command running, Handler: 6');
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
        try {
            const commandFile = require(`../commands/${command}.js`);
            commandFile.run(client, msg, args);
        } catch (err) {
            msg.reply(`Command execution failed!\n Error: ${err.message}\nCheck spelling of command, edit your message if you can.\nIf the error seems unusual, message @Striker#7250, or join the server and ask for help.\nPlease, post your error so we know what we're dealing with here :)`);
            error(err);
            msg.channel.stopTyping();
        }
        //End Running Commands

        //Logger
        client.channels.get('308545302615293953').send({
            embed: log
        }).then(msg.channel.stopTyping());
        //Logger    
    } else return;
};