const Discord = require('discord.js');
const { color } = require('../../db/db.js');

exports.run = (client, msg) => {
  const roles = [];
  msg.guild.roles.forEach((r) => {
    roles.push(r.name);
  });

  const channels = [];
  msg.guild.channels.forEach((c) => {
    if (c.type == 'text') {
      channels.push(c.name + ' (text)');
    }
    if (c.type == 'voice') {
      channels.push(c.name + '(voice)');
    }
  });

  let botCount = 0;
  msg.guild.members.forEach((m) => {
    if (m.user.bot) {
      botCount++;
    }
  });

  let userCount = 0;
  msg.guild.members.forEach((m) => {
    if (!m.user.bot) {
      userCount++;
    }
  });

  let verificationLevel = msg.guild.verificationLevel;
  const indexes = ['0', '1', '2', '3', '4'];
  const levels = [
    'None',
    'Low',
    'Medium',
    '(╯°□°）╯︵ ┻━┻ ',
    '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
  ];
  for (const i in indexes) {
    verificationLevel = levels[i];
  }

  const serverinfo = new Discord.MessageEmbed()
    .setTitle(`Server info for ${msg.guild.name}`)
    .setThumbnail(client.user.avatarURL())
    .setImage(msg.guild.iconURL({
      size: 256,
    }))
    .setColor(color)
    .addField('Owner', `${msg.guild.owner} ID: ${msg.guild.owner.id}`)
    .addField('Created at', msg.guild.createAt, true)
    .addField('Channels', channels, true)
    .addField('Roles', roles, true)
    .addField('Users', userCount, true)
    .addField('Bots', botCount, true)
    .addField('Verification level', verificationLevel, true);

  msg.channel.send({
    embed: serverinfo,
  });
};
