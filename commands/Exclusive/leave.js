const ids = require('../db/db.json').ids;

exports.run = (client, msg, args) => {
   if (ids.indexOf(msg.author.id)) {
      if (client.guilds.get(args.join(' ')) {
       client.guilds.get(args.join(' ')).leave();
      }
      
      if (client.guilds.find('name', args.join(' '))) {
         client.guilds.find('name', args.join(' ')).leave();
   }
};

exports.help = {
   'help': {
      name: 'Leave',
      description: 'Leaves a server specified',
      category: 'Exclusive',
      usage: 'y!leave <guild id OR name (caps sensitive, must be exact)>',
      requiredPerms: 'Bot Manager'
};
