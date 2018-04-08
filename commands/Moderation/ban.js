exports.run = (client, msg) => {
  if (!msg.mentions.users.first()) return msg.reply('Must specify a user!');

  const hasban = 'BAN_MEMBERS';
  if (msg.member.hasPermission(hasban)) {
    if (msg.member.roles.highest.comparePositionTo(msg.guild.member(msg.mentions.users.first())) < 0) return msg.reply('You cannot ban this user, they have a higher role than you!');
    if (msg.member.roles.highest.comparePositionTo(msg.guild.member(msg.mentions.users.first())) == 0) return msg.reply('You cannot ban this user, they the same role than you!');
    msg.guild.member(msg.mentions.users.first()).ban();
    msg.channel.send(`The ban hammer :hammer: has struck on **${msg.mentions.users.first().username}**!`);
  } else {
    msg.channel.send('You cannot ban this user, you do not have the permissions to!');
  }
};

exports.help = {
  'help': {
    name: 'Ban',
    description: 'Bans a member',
    category: 'Moderation',
    usage: 'y!ban <tag member>',
    requiredPerms: 'Ban Members',
  },
};
