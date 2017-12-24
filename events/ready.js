const superagent = require('superagent');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://yeyjvmpsmswzsj:3ddbc47a64bcc6ff89ccd25d5d634b7cf4720cad32849cdeb3d845284ae0d68a@ec2-54-163-233-103.compute-1.amazonaws.com:5432/def8s59bi50pk5');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const prefixes = sequelize.define('prefixes', {
  GuildID: {
    type: Sequelize.STRING
  },
  prefix: {
    type: Sequelize.STRING
  }
});

exports.run = async(client) => {
  prefixes.sync();
  console.log('Synced prefixes');
  client.guilds.forEach(guild => {
    prefixes.create({
      GuildID: guild.id,
      prefix: ''
    });
  });

  superagent.post('https://discordbots.org/api/bots/stats')
    .set('Authorization', process.env.DBTOKEN)
    .send({
      server_count: client.guilds && client.guilds.size ? client.guilds.size : (client.Guilds ? client.Guilds.size : Object.keys(client.Servers).length)
    })
    .then(() => console.log('Updated discordbots.org stats!'))
    .catch(err => console.error(`Error updating discordbots.org stats: ${err.body} || ${err}`));
  const guilds = client.guilds.size;
  client.user.setActivity(`for y!help | ${guilds} servers`, {
    type: 'WATCHING'
  });
  console.log('Yuga is connected to the Discord WebSocket');
  const channel = client.channels.get('308278703283240960');
  if (channel) channel.send('Yuga is now online!');
  setTimeout(function () {
    client.channels.get('308278703283240960').send(`Yuga's recent pings are: ${client.pings}, with an average of ${client.ping}. (API response time for Discord)`),
      1200000;
  });

};

module.exports.prefixes = prefixes;