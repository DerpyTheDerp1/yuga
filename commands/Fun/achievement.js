const snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
  let [title, contents] = args.join(' ').split(' | ');
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

module.exports = {
  'help': {
    name: 'Achievement',
    description: 'Creates a Minecraft achievement from input text',
    category: 'Fun',
    usage: 'y!achievement <title> | <text>\ny!achievement <text>',
    requiredPerms: 'none'
  }
};