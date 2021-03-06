exports.run = (client, msg, args) => {
  const Discord = require('discord.js');
  const [usr, top, bottom] = args.join(' ').split(' | ');
  const user = msg.mentions.users.first();
  if (!usr && !top && !bottom) return msg.reply('Command cannot be ran like this, problem between keyboard and chair.');
  if (!usr) return msg.reply('Invalid, no user defined.');
  if (!top) return msg.reply('Invalid, top text missing.');
  if (!bottom) return msg.reply('Invalid, bottom text missing.');


  const image = user.avatarURL();
  const memeurl = `https://memegen.link/custom/${encodeURIComponent(top)}/${encodeURIComponent(bottom)}.jpg?alt=${encodeURIComponent(image)}&font=impact`;
  const meme = new Discord.MessageEmbed()
    .setImage(memeurl);

  msg.channel.send({
    embed: meme,
  });
};

exports.help = {
  'help': {
    name: 'Memeuser',
    description: 'Makes a meme out of a user\'s profile picture',
    category: 'Fun',
    usage: 'y!memeuser <tag user> | <top text> | <bottom text>',
    requiredPerms: 'None',
  },
};
