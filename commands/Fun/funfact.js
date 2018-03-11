exports.run = (client, msg) => {
    const { funFacts } = require('../../db/db.js');
    const funFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    JSON.stringify(funFact);
    msg.channel.send(funFact);
};

exports.help = {
  'help': {
    name: 'Fun fact',
    description: 'Gives one of our fantastic fun facts',
    category: 'Fun',
    usage: 'y!funfact',
    requiredPerms: 'None',
  },
};
