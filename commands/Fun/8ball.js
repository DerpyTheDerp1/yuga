const { Command } = require('discord-akairo')

class 8ball extends Command {
  constructor() {
    super('8ball', {
      aliases: ['8ball', '8b', 'ask'],
      args: [
        {
          id: 'question',
          type: 'string'
        }
      ]
    }
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
    
    const answer = answers
  }
}
