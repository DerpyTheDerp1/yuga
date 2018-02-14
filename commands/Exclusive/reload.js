exports.run = (client, msg, args) => {
  const striker = '215509157837537280';

  if (msg.author.id == striker) {
    if (!args || args.size < 1) return msg.channel.reply('Must provide a file to reload!');
    delete require.cache[require.resolve(`${args[0]}`)];
    msg.reply(`The file ${args[0]} has been reloaded`);
  } else {
    return;
  }
};
