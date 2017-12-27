const superagent = require('superagent');
let prefix = ''
exports.run = async(client) => {
  const guilds = client.guilds.size;
  
if (client.user.username == 'Yuga Testing') prefix = 'yt!'

if (client.user.username == 'Yuga!') prefix == 'yt!'
  client.user.setActivity(`for ${prefix}help | ${guilds} servers`, {
    type: 'WATCHING'
  });
  console.log('Yuga is connected to the Discord WebSocket');
  const channel = client.channels.get('308278703283240960');
  if (channel) channel.send('Yuga is now online!');
  setTimeout(function () {
    client.channels.get('308278703283240960').send(`Yuga's recent pings are: ${client.pings}, with an average of ${client.ping}. (API response time for Discord)`),
      1200000;
  });
 if (process.env.DBENABLED == 'no') return;
else {
 superagent.post('https://discordbots.org/api/bots/stats')
    .set('Authorization', process.env.DBTOKEN)
    .send({
      server_count: client.guilds && client.guilds.size ? client.guilds.size : (client.Guilds ? client.Guilds.size : Object.keys(client.Servers).length)
    })
    .then(() => console.log('Updated discordbots.org stats!'))
    .catch(err => console.error(`Error updating discordbots.org stats: ${err.body} || ${err}`));
 }
};
