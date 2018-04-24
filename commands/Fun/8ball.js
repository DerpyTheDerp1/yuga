const { Command } = require('discord-akairo');

class EightballCommand extends Command {
  constructor() {
    super('8ball', {
      aliases: ['8ball', '8b', 'ask'],
      args: [
        {
          id: 'question',
          type: 'string',
          match: 'content'
        }
      ]
    }),

    this.help = {
      'help': {
          name: '8ball',
          description: 'Answers the world\'s biggest questions',
          category: 'Fun',
          usage: 'y!8ball <question>',
          requiredPerms: 'None'
      }
    };
  }

  exec(msg, args) {
    const question = args.question;
    if (!question) return msg.reply('Please ask a question!');
    const answers = [
      'Yes',
      'No',
      'Probably',
      'Probably not',
      'Absolutely',
      'Absolutlely not',
      'Duh, of course it is',
      'Shut up',
      'That is for you to decide'
    ];

    const answer = answers[Math.floor(Math.random() * answers.length)];
    msg.channel.send(`**QUESTION**: ${question}\n**ANSWER**: ${answer}`);
  }
}

module.exports = EightballCommand;
