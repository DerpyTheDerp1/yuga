const quickGist = require('quick-gist');

exports.run = async (client, msg, args) => {
  const Discord = require('discord.js');
  const striker = '215509157837537280';
  const code = args.join(' ');
  function clean(text) {
    if (typeof (text) === 'string') {
      return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    } else {
      return text;
    }
  }

  if (msg.author.id == striker) {
    try {
      let evaled = eval(code);

      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled);
      }

      if (evaled.length >= 2000) {
        quickGist({
         content: evaled,
         }, (err, resp, data) => {
          msg.channel.send(data.url);
       });
        evaled = 'Output large, sent to gist.';
      }

      if (evaled.length >= 1024) {
        quickGist({
         content: evaled,
         }, (err, resp, data) => {
          msg.channel.send(data.url);
       });
        evaled = 'Output large, sent to gist.';
      }

      const succembed = new Discord.MessageEmbed()
        .setTitle('EVAL SUCCESS')
        .addField('INPUT <:input:372482332067758082>', `\`\`\`xl\n${code}\n\`\`\``)
        .addField('OUTPUT <:output:372482366372839435>', `\`\`\`xl\n${clean(evaled)}\n\`\`\``)
        .setTimestamp()
        .setThumbnail(client.user.avatarURL());
      msg.channel.send({
        embed: succembed,
      });
    } catch (err) {
      if (!err) return;
      const errembed = new Discord.MessageEmbed()
        .setTitle('**__EVAL ERROR__**')
        .addField('INPUT <:input:372482332067758082>', `\`\`\`${code}\`\`\``)
        .addField('OUTPUT <:output:372482366372839435>', `\`\`\`xl\n${clean(err)}\n\`\`\``)
        .setColor('#ff0000')
        .setTimestamp()
        .setThumbnail(client.user.avatarURL());
      msg.channel.send({
        embed: errembed,
      });
    }
  } else return;
};

exports.help = {
  'help': {
    name: 'Eval',
    description: 'Evaluates JavaScript code',
    category: 'Exclusive',
    usage: 'y!eval <code>',
    requiredPerms: 'To be Striker... duh.',
  },
};
