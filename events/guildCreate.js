const Discord = require('discord.js');
const {
  stringify
} = require('querystring');

const {
  request
} = require('https');

const dbtoken = require('../config.json').dbtoken;

exports.run = async (client, guild) => {
    console.log('Yuga has been added to a new server!');
    const update = () => {
        const data = stringify({
            server_count: client.servers.size
        });
        const req = request({
            host: 'discordbots.org',
            path: `/api/bots/${client.user.id}/stats`,
            method: 'POST',
            headers: {
                'Authorization': dbtoken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data)
            }
        });
        req.write(data);
        req.end();
    };

    console.log('Finding server...');
    const server = client.guilds.get(guild.id);
    console.log('Server found');
    console.log('Making channel...');
    const channel = await server.createChannel('yuga-info');
    console.log('Channel made!');
    console.log('Making invite...');
    const invite = await channel.createInvite({
        maxAge: 0
    });
    console.log('Invite made!');

    const serveradded = new Discord.MessageEmbed()
        .setAuthor('Yuga')
        .setColor('#08ff00')
        .setTitle('New server added!')
        .setThumbnail(client.user.avatarURL())
        .setDescription('Yuga has been added to a new server!\nThe server info will be displayed below.')
        .addField('Server info', `Name: ${server.name}\nID: ${server.id}\nMade: ${server.createdAt}\nOwner: ${server.owner.user.tag} (ID: ${server.ownerID})\nRegion: ${server.region}\nRoles: ${server.roles.size}\nVerification Level: ${server.verificationLevel}\nMembers: ${server.members.size} \nInvite link: ${invite}`)
        .setTimestamp();

    const welcome = new Discord.MessageEmbed()
        .setAuthor('Yuga')
        .setThumbnail(client.user.avatarURL())
        .setColor('#ff4500')
        .addField('Thanks for adding Yuga!', 'Hi! I\'m Yuga, thanks for adding me.\nI have many features, and if you wish to know them use "y!help" to get a list of all the amazing stuff I can do!\nThanks for listening, and I hope you enjoy using Yuga!')
        .addField('Need to contact us?', 'You can always join the official server and ask for help there!\nWe are English speaking, but we can speak some foreign languages too.\nJoin here: https://discord.gg/vJBrsY6')
        .setTimestamp();

    console.log('Setting game...');
    client.user.setActivity(`for y!help | ${client.guilds.size} servers`, {
        type: 'WATCHING'
    });
    console.log('Game set!');
    console.log('Sending messages...');
    client.channels.get('308649578318528513').send({
        embed: serveradded
    });
    server.owner.send({
        embed: welcome
    });

    channel.send({
        embed: welcome
    });

    channel.send('Yuga requires certain channels to function. To know more, run y!config');
    console.log('Messages sent!');

    update();
    console.log('Discord bots updated!');
};