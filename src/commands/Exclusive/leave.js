const ids = require('../db/db.json').ids;

exports.run = (client, msg, args) => {
   if(ids.indexOf(msg.author.id)) {
       client.guilds.get(args.join(' ')).leave();
   }
};