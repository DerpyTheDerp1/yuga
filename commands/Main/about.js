const Discord = require('discord.js');
const { color } = require('../../db/db.js');

exports.run = (client, msg) => {
  const info = new Discord.MessageEmbed()
    .setAuthor('Yuga was made by Striker#1337!', client.users.get('215509157837537280').displayAvatarURL())
    .addField('When was Yuga made?', 'Yuga was made in March 2017, and is still actively being developed.')
    .addField('What is Yuga\'s prefix?', 'Yuga\'s prefix is y!, but we also will support mentions very soon.\nMentions will work like `@Yuga help`')
    .addField('What commands does Yuga have?', 'Yuga has many commands.\nYou can see all our commands by using `y!help` to find out more!')
    .addField('Is Yuga\'s source code up for free on Github?', 'Yes.\nThe code is at [this](https://github.com/strikerrr/yuga) github, managed under the [MIT license](https://github.com/Strikerrr/yuga/blob/master/LICENSE)')
    .addField('How do we get support for Yuga if commands do not work etc?', 'Simple.\n1) Join the [server](https://discord.gg/FDNUgWC)\n2) Ask about your problem, maybe tag @Management Team if necessary\n 3) THIS SHOULD ONLY BE DONE AS A FINAL RESORT, tag Striker.\nIf the error from the command definetely seems like something Striker needs to see, tag him.\n\nIf the error is, for example, cannot find /commands/kek.js then this means a command does not exist.')
    .addField('What library does Yuga use?', 'Yuga always uses discord.js master.')
    .addField('How does such and such command work?', 'You can view the code on github [here](https://github.com/Strikerrr/yuga/tree/master/commands) for all commands')
    .setTimestamp()
    .setThumbnail(client.user.avatarURL())
    .setColor(color);

  msg.channel.send({
    embed: info,
  });
};
