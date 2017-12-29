const Discord = require('discord.js');
const color = require('../../db/db.json').color;

exports.run = (client, msg, args) => {
  const striker = client.users.get('215509157837537280');
  if (msg.author.id != striker.id) return;
  const errortype = args.join(' ');
  const error = new Error(errortype);
  const err = error;
  const errorembed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle('New Error Caught!')
    .setTimestamp()
    .setDescription(`\`\`\`xl\n${err.stack}\`\`\``);

  client.channels.get('385485532458778626').send(striker, {
    embed: errorembed
  });
};