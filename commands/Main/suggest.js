const { MessageEmbed } = require('discord.js');


exports.run = (client, msg, args) => {
  const [commandName, description] = args.join(' ').split(' | ');
  if (!commandName || !description) return msg.reply('Missing arguments');
  else {
    const suggestionEmbed = new MessageEmbed()
      .setTitle('Suggestion')
      .setThumbnail(msg.author.avatarURL())
      .setAuthor(msg.author.tag)
      .addField('Command Name', commandName, true)
      .addField('Description', description, true)
      .setTimestamp();
    client.channels.get('409741553918279700').send('@here Please vote for this command suggestion!', {
      embed: suggestionEmbed,
    }).then(async (m) => {
      await m.react('👍');
      await m.react('👎');
    });
    msg.reply('Suggested!');
  }
};

exports.help = {
  'help': {
    name: 'Suggest',
    description: 'Suggests a command for Yuga!',
    category: 'Main',
    usage: 'y!suggest Command Name | description\n\nFor the description, please make it as detailed as possible. Commands returning images of cats are simple to explain, warning commands may not be.',
    requiredPerms: 'None',
  },
};
