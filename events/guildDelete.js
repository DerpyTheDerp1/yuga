const superagent = require('superagent');
let prefix = '';
exports.run = async (client, guild) => {
  if (client.user.username == 'Yuga Testing') prefix = 'yt!';

  if (client.user.username == 'Yuga!') prefix = 'y!';

  await client.user.setActivity(`for ${prefix}help | ${client.guilds.size} servers`, {
    type: 'WATCHING',
  });
  guild.owner.send('Hi! We see you kicked our bot. Could you explain briefly to Striker#1337 why, and we can consider improvements and such. Thanks!');
  client.channels.get('428587986683297822').send(`Kick from: ${guild.name}\nOwner: ${guild.owner.user.username}#${guild.owner.user.discriminator} (ID: ${guild.owner.id})`);
  if (process.env.DBENABLED == 'no') return;
  else {
    superagent.post('https://discordbots.org/api/bots/stats')
      .set('Authorization', process.env.DBTOKEN)
      .send({
        server_count: client.guilds && client.guilds.size ? client.guilds.size : (client.Guilds ? client.Guilds.size : Object.keys(client.Servers).length),
      })
      .then(() => console.log('Updated discordbots.org stats!'))
      .catch(err => console.error(`Error updating discordbots.org stats: ${err.body} || ${err}`));
  }
};
