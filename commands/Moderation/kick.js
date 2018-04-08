exports.run = (client, msg) => {
  const haskick = 'KICK_MEMBERS';
  const member = msg.guild.member(msg.mentions.users.first());
  if (!msg.mentions.users.first()) return msg.reply('Must specify a user!');
  if (msg.member.hasPermission(haskick)) {
    if (msg.member.roles.highest.position < member.roles.highest.position) return msg.reply('You cannot kick this user, they have a higher role than you!');
    if (msg.member.roles.highest.position == member.roles.highest.position) return msg.reply('You cannot kick this user, they have the same role as you!');
    if (member == msg.member) return msg.reply('Why are you trying to kick yourself ;-;');
    member.kick();
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
