exports.run = (client, msg) => {
  const haskick = 'KICK_MEMBERS';

  if (!msg.mentions.users.first()) return msg.reply('Must specify a user!');
  if (msg.member.hasPermission(haskick)) {
    if (msg.member.roles.highest.comparePositionTo(msg.guild.member(msg.mentions.users.first())) < 0) return msg.reply('You cannot kick this user, they have a higher role than you!');
    if (msg.member.roles.highest.comparePositionTo(msg.guild.member(msg.mentions.users.first())) == 0) return msg.reply('You cannot kick this user, they the same role than you!');
    msg.guild.member(msg.mentions.users.first()).kick();
    msg.channel.send(`User **${msg.mentions.users.first().username}** kicked!`);
  } else {
    msg.reply('You cannot kick this user, you don\'t have the permissions to.');
  }
};

exports.help = {
  'help': {
    name: 'Kick',
    description: 'Kicks a member',
    category: 'Moderation',
    usage: 'y!kick <tag user>',
    requiredPerms: 'Kick Members',
  },
};
