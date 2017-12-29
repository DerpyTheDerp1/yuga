exports.run = (client, msg, args) => {
    const Discord = require('discord.js');
    const guild = client.guilds.get(msg.guild.id);
    const warnhelp = new Discord.MessageEmbed()
        .setTitle('Warn Usage')
        .setAuthor('Yuga')
        .setColor('#32CD32')
        .addField('About', 'Warns a user', false)
        .addField('Usage', 'y!warn <tag user> | <reason>', false)
        .addField('Perms required', 'Kick members')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();

    const denied = new Discord.MessageEmbed()
        .setTitle('ACCESS DENIED')
        .setAuthor(msg.author.tag)
        .setColor('#FF0000')
        .setDescription('You do not have the permissions needed to use this command. Missing perms: KICK_MEMBERS')
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();

   const [user, reason] = args.join(' ').split(' | ');
    if (!user && !reason) return msg.channel.send({
        embed: warnhelp
    });

    if (!user) return msg.reply('Please specify a user!');

    if (!reason) return msg.reply('Please specify a reason!');

   const modavatar = msg.author.avatarURL();
   const mod = msg.author.tag;
   const haskick = 'KICK_MEMBERS';
   const userr = msg.mentions.users.first();
   const usertag = userr.tag;
   const useravatar = userr.avatarURL();
   const warningchannel = guild.channels.find('name', 'yuga-warnings');

    if (msg.member.hasPermission(haskick)) {


        if (!warningchannel) return guild.createChannel('yuga-warnings');

        const l1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
        const l2 = ['1', '3', '5', '7', '9'];
        const l3 = ['B', 'D', 'E', 'M', 'O', 'N', 'H', 'I', 'J', 'L'];
        const l4 = ['2', '4', '6', '8', '0'];
        const l5 = ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        const one = l1[Math.floor(Math.random() * l1.length)];
        const two = l2[Math.floor(Math.random() * l2.length)];
        const three = l3[Math.floor(Math.random() * l3.length)];
        const four = l4[Math.floor(Math.random() * l4.length)];
        const five = l5[Math.floor(Math.random() * l5.length)];

        const casenum = one + two + three + four + five;

       const warnembed = new Discord.MessageEmbed()
            .setTitle(`CASE ${casenum}`)
            .setColor(0xFF0000)
            .setDescription('A new warning has been given out!')
            .addField('USER', `${usertag}`)
            .addField('MOD', `${mod}`)
            .addField('REASON', `${reason}`)
            .setImage(useravatar)
            .setThumbnail(modavatar)
            .setTimestamp();
        warningchannel.send({
            embed: warnembed
        });
    } else {
        msg.channel.send({
            embed: denied
        });
    }

};