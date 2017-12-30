exports.run = async (client, msg, args) => {
      const say = args.join(' ');
      await msg.delete();
      msg.channel.send(`\u200B${say}`);
};

exports.help = {
      'help': {
            name: 'Say',
            description: 'Makes the bot say anything',
            category: 'Fun',
            usage: 'y!say <anything>',
            requiredPerms: 'None'
      }
};