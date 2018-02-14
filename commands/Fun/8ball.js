exports.run = (client, msg, args) => {
  const question = args.join(' ');

  if (!question) return msg.reply('You must ask a question!');

  const answers = [
    'Yes',
    'No',
    'Probably',
    'Probably not',
    'Absolutely',
    'Absolutlely not',
    'Duh, of course it is',
    'Shut up',
    'That is for you to decide',
  ];
  const ranAnswer = answers[Math.floor(Math.random() * answers.length)];
  msg.channel.send(`**QUESTION**: ${question}\n**ANSWER**: ${ranAnswer}`);
};

exports.help = {
  'help': {
    name: '8ball',
    description: 'Answers the world\'s biggest questions',
    category: 'Fun',
    usage: 'y!8ball <question>',
    requiredPerms: 'None'
  },
};
