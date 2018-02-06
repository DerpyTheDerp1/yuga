const Discord = require('discord.js');

exports.run = (client, msg, args) => {

    const guild = msg.guild;
    const configselection = args.join(' ');
    const channel = msg.channel;
    const configoptions = new Discord.MessageEmbed()
        .setTitle('CONFIG OPTIONS')
        .setAuthor('Yuga')
        .setColor(0xFF0000)
        .addField('Current options', 'welcome messages\ngoodbye messages\nwarnings\nALL')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();

    const confighelp = new Discord.MessageEmbed()
        .setTitle('Warn Usage')
        .setAuthor('Yuga')
        .setColor(0x32CD32)
        .addField('About', 'Configurates all necessary channels for the features such as welcome messages', false)
        .addField('Usage', 'y!config <any of the config options>\ny!config ALL\ny!config options (to get options)', false)
        .addField('Perms required', 'None')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();

    if (configselection == 'welcome messages') {
        channel.startTyping();
        msg.react('✅');
        guild.channels.create('yuga-welcome', 'text');
        msg.reply('Welcome messages configurated!');
        channel.stopTyping();
    }

    if (configselection == 'goodbye messages') {
        channel.startTyping();
        msg.react('✅');
        guild.channels.create('yuga-goodbye', 'text');
        msg.reply('Goodbye messages configurated!');
        channel.stopTyping();
    }

    if (configselection == 'warnings') {
        channel.startTyping();
        msg.react('✅');
        guild.channels.create('yuga-warnings', 'text');
        msg.reply('Warnings configurated!');
        channel.stopTyping();
    }

    if (configselection == 'options') {
        channel.startTyping();
        msg.react('✅');
        msg.channel.send({
            embed: configoptions
        });
        channel.stopTyping();
    }

    if (configselection == 'ALL') {
        msg.react('✅');
        channel.startTyping();
        guild.channels.create('yuga-warnings', 'text');
        guild.channels.create('yuga-goodbye', 'text');
        guild.channels.create('yuga-welcome', 'text');
        msg.reply('Everything configurated!');
        channel.stopTyping();
    }
    if (!configselection) {
        channel.startTyping();
        msg.react('✅');
        msg.channel.send({
            embed: confighelp
        });
        channel.stopTyping();
    }
};