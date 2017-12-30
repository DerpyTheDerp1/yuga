exports.run = (client, msg, args) => {
  const thing = args.join(' ');
  const digit = ((Math.floor(Math.random() * (500 - 1 + 1))) + 1);
  msg.channel.send(`I would rate ${thing} a \n \n ${digit}/500`);
};

exports.help = {
  'help': {
    name: 'Rate',
    description: 'Rates absolutely anything',
    category: 'Fun',
    usage: 'y!rate <anything>',
    requiredPerms: 'None'
  }
};