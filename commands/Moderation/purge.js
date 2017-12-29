exports.run = async (client, msg, args) => {
  const Discord = require('discord.js');
  const embed = new Discord.MessageEmbed()
    .setTitle('ACCESS DENIED')
    .setAuthor(msg.author.tag)
    .setColor('#FF0000')
    .setDescription('You do not have the permissions needed to use this command. Missing perms: MANAGE_MESSAGES')
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();

  const purgeHelp = new Discord.MessageEmbed()
    .setTitle('Purge Usage')
    .setAuthor('Yuga')
    .setColor(0x32CD32)
    .addField('About', 'Removes a specified amount of messages from the server, even from a certain user.', false)
    .addField('Usage', 'y!purge <amount>\ny!purge <tag user> <amount>', false)
    .addField('Perms required', 'Manage Messages')
    .addField('Note', 'Due to Discord API limitations, bots cannot delete messages older than 14 days.\nHowever, we have no limit as to how many we can delete (as of now) so purge away!')
    .setThumbnail(client.user.avatarURL())
    .setTimestamp();

  const arg = args.join(' ');

  if (!arg) {
    msg.channel.send({
      embed: purgeHelp
    });
    return;
  }

  const managemsgs = 'MANAGE_MESSAGES';


  if (msg.member.hasPermission(managemsgs)) {

    const user = msg.mentions.users.first();
    const amount = !parseInt(msg.content.split(' ')[1]) ? parseInt(msg.content.split(' ')[2]) : parseInt(msg.content.split(' ')[1]);
    if (!amount) return msg.reply('Must specify an amount to delete!');
    if (!amount && !user) return msg.reply('Must specify a user and amount (or just an amount) of msgs to purge!');
    if (amount < 3) return msg.reply('Cannot be less than 3!');
    if (amount > 100) {
      const hundreds = Math.floor(amount / 100);
      const remainder = amount % 100;

      for (let i = 0; i < hundreds; i++) {
        if (i !== hundreds - 1) {
          await msg.channel.bulkDelete(100);
          continue;
        }
        if (remainder >= 2) await msg.channel.bulkDelete(remainder);
        const m = await msg.channel.send(`${msg.author} deleted ${amount} messages!`);
        if (remainder === 1) setTimeout(() => msg.channel.bulkDelete(2), 5e3);
        else m.delete(5e3);
      }
    }
    if (amount <= 100) {
      let msgs = await msg.channel.messages.fetch({
        limit: amount,
      });
      if (user) {
        const filterBy = user ? user.id : client.user.id;
        msgs = msgs.filter(m => m.author.id === filterBy).array().slice(0, amount);
      }
      msg.channel.bulkDelete(msgs).catch(error => console.log(error.stack));
      const purge = await msg.channel.send(`${msg.author} purged ${amount} messages!`);
      setTimeout(function() {
        purge.delete();
      }, 5000);
    }
  } else {
    msg.channel.send({
      embed
    });
  }

};