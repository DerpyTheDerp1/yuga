exports.run = async (client, msg, args) => {
      const say = args.join(' ');
      await msg.delete();
      msg.channel.send('\u200B' + say);
};