const superagent = require('superagent');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('prefixes', 'Striker', null, {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  // SQLite only
  storage: '../db/prefixes.sqlite',
  operatorsAliases: false
});

const prefixes = sequelize.define('prefixes', {
  guildID: {
    type: Sequelize.STRING,
    unique: true,
  },
  prefix: {
    type: Sequelize.STRING,
    unique: false
  }
});

exports.run = async(client) => {
  try {
    client.guilds.forEach(async g => {
      await prefixes.create({
        guildID: g.id,
        prefix: ''
      });
      console.log('Prefixes created for new guilds!');
    });
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return console.error;
    } else return console.error;
  }

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