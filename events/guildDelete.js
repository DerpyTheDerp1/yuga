const superagent = require('superagent')

exports.run = async (client, guild) => {
  await client.user.setActivity(`for yt!help | ${client.guilds.size} servers`, {
    type: 'WATCHING'
  });
  guild.owner.send('Hi! We see you kicked our bot. Could you explain briefly to Striker#7250 why, and we can consider improvements and such. Thanks!');
  client.channels.get('308649578318528513').send(`Kick from: ${guild.name}\nOwner: ${guild.owner.user.username}#${guild.owner.user.discriminator} (ID: ${guild.owner.id})`);
 if (process.env.DBENABLED == 'no') return;
 else {
 superagent.post('https://discordbots.org/api/bots/stats')       
   .set('Authorization', process.env.DBTOKEN)       
   .send({ server_count: client.guilds && client.guilds.size ? client.guilds.size : (client.Guilds ? client.Guilds.size : Object.keys(client.Servers).length) })       
   .then(() => console.log('Updated discordbots.org stats!'))       
   .catch(err => console.error(`Error updating discordbots.org stats: ${err.body} || ${err}`))
 }
};
