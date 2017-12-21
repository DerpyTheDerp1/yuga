const prefix = 'y!';
const Discord = require('discord.js');
const color = require('../db/db.json').color;
const sequelize = require('sequelize');
const ready = require('../events/ready');
const prefixes = ready.prefixes;

exports.run = async(client, msg) => {
    //Custom error catcher function
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

    //Command Handler #5: Custom Prefixes
    const customPrefix = await prefixes.findOne({
        where: {
            guildID: msg.guild.id
        }
    });

    if (!customPrefix) return;
    else {
        if (msg.content.startsWith(customPrefix)) {
            command = command.slice(customPrefix.length);
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
    }

    //Code to do nothing if there is no prefix. All other messages are ignored thus.
};