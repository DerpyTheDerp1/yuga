const test = console.log('test success');
const fs = require('fs');
const Discord = require('discord.js');
const { color } = require('db');

const runCommand = (client, msg, cmd, args) => {
    try {
        const CommandsFolder = fs.readdirSync('./commands');
        for (const group of CommandsFolder) {
            try {
                const commands = fs.readdirSync('./commands/' + group);
                for (const command of commands) {
                    if (command.slice(0, -3) === cmd) {
                        const commandFile = require('../commands/' + group + '/' + command);
                        commandFile.run(client, msg, args);
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

const checkDm = (prefix, msg) => {
    if (msg.content.startsWith(prefix) && msg.channel.type === 'dm' || !msg.guild) {
        const content = msg.content;
        console.log(`${msg.author.username}#${msg.author.discriminator} tried to DM me`);
        console.log(`Contents: ${content}`);
        msg.channel.send('You cannot use this command in DM, try sending this in a server.');
        //End
    }
};

const error = (client, err) => {
    const errorembed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('New Error Caught!')
        .setTimestamp()
        .setDescription(`\`\`\`xl\n${err.stack}\`\`\``);
    client.channels.get('385485532458778626').send({
        embed: errorembed
    });
};

const eventLoader = (client) => {
    fs.readdir('./events/', (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            const eventFunction = require(`./events/${file}`);
            const eventName = file.split('.')[0];
            client.on(eventName, (...args) => eventFunction.run(client, ...args));
        });
    });
};

exports.test = test;
exports.runCommand = runCommand;
exports.cmdLogger = cmdLogger;
exports.checkDm = checkDm;
exports.error = error;
exports.eventLoader = eventLoader;
