exports.run = (client, msg, args) => {
    const server = client.guilds.get(msg.guild.id);
    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed()
        .setTitle('ACCESS DENIED')
        .setAuthor(msg.author.tag)
        .setColor('#FF0000')
        .setDescription('You do not have the permissions needed to use this command. Missing perms: CREATE_INSTANT_INVITE')
        .setFooter(`Striker's Bots 2017© | Sent in ${server.name} `)
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();

    const invhelp = new Discord.MessageEmbed()
        .setTitle('Create Invite Usage')
        .setAuthor('Yuga')
        .setColor('#32CD32')
        .addField('About', 'Creates an invite for a server Yuga IS in', false)
        .addField('Usage', 'y!createInvite <server id>\ny!createInvite <server id> infinite\nThe above creates an INFINITE invite', false)
        .addField('Perms required', 'Create instant invite')

        .setThumbnail(client.user.avatarURL())
        .setTimestamp();

    const [serveri, time] = args.join(' ').split(' | ');
    const guild = client.guilds.get(serveri);

    if (!serveri) return msg.channel.send({
        embed: invhelp
    });
    const channel = guild.channels.filter(c => c.permissionsFor(guild.me).has('SEND_MESSAGES') && c.type === 'text').first();
    const createinv = 'CREATE_INSTANT_INVITE';

    if (msg.member.hasPermission(createinv)) {
        if (time == 'infinite') {
            channel.createInvite({
                    maxAge: 0
                })
                .then((invite) => {
                    msg.channel.send(`Here is an invite for Guild ID: ${guild.id} | ${invite} | This invite is infinite`);
                });

        } else {
            channel.createInvite()
                .then((invite) => {
                    msg.channel.send(`Here is an invite for Guild ID: ${guild.id} | ${invite} | This invite lasts 24 hours`);
                });
        }
    } else {
        msg.channel.send({
            embed
        });
    }
};