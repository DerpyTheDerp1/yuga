const snekfetch = require('snekfetch');
const Discord = require('discord.js');

exports.run = (client, msg, args) => {

  const achievementhelp = new Discord.MessageEmbed()
    .setTitle('Achievement Usage')
    .setAuthor('Yuga')
    .setColor(0x32CD32)
    .addField('About', 'Makes a Minecraft achievement box', false)
    .addField('Usage', 'y!achievement <title> | <text>\ny!achievement <text>', false)
    .addField('Perms required', 'None')
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();

  let [title, contents] = args.join(' ').split(' | ');

  if (!title) return msg.channel.send({
    embed: achievementhelp
  });

  if (!contents) {
    [title, contents] = ['Achievement Get!', title];
  }


  let rnd = Math.floor((Math.random() * 39) + 1);
  if (args.join(' ').toLowerCase().includes('burn')) rnd = 38;
  if (args.join(' ').toLowerCase().includes('cookie')) rnd = 21;
  if (args.join(' ').toLowerCase().includes('cake')) rnd = 10;

  if (title.length > 22 || contents.length > 22) return msg.edit('Max Length: 22 Characters. Soz.').then(setTimeout(msg.delete.bind(msg), 1000));
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snekfetch.get(url)
    .then(r => msg.channel.send('', {
      files: [{
        attachment: r.body
      }]
    }));
  msg.delete();

};