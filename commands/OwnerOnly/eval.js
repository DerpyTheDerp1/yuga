const { Command } = require('discord-akairo');

class EvalCommand extends Command {
    constructor() {
        super('eval', {
            category: 'OwnerOnly',
            aliases: ['eval'],
            ownerOnly: true,
            args: [
            {
                id: 'code',
                type: 'string'
            }],
            typing: true
        });
    }
    exec(msg, args) {
        var PastebinAPI = require('pastebin-js'),
            pastebin = new PastebinAPI({
                'api_dev_key': process.env.PASTEBIN_API_KEY
            });
        const striker = '215509157837537280';
        const code = args.code;
        function clean(text) {
            if (typeof(text) === 'string') {
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

                if (evaled.length >= 1024) {
                    pastebin
                        .createPaste(clean(evaled), 'eval.js')
                        .then((data) => {
                            msg.channel.send(data);
                        })
                        .fail(function(err) {
                            console.log(err);
                        });
                    evaled = 'Output large, sent to pastebin.';
                }

                if (evaled.length >= 2000) {
                    pastebin
                        .createPaste(clean(evaled), 'eval.js')
                        .then((data) => {
                            msg.channel.send(data);
                        })
                        .fail(function(err) {
                            console.log(err);
                        });
                    evaled = 'Output large, sent to pastebin.';
                }

                const succembed = this.client.util.embed()
                    .setTitle('EVAL SUCCESS')
                    .addField('INPUT <:input:372482332067758082>', `\`\`\`xl\n${code}\n\`\`\``)
                    .addField('OUTPUT <:output:372482366372839435>', `\`\`\`xl\n${clean(evaled)}\n\`\`\``)
                    .setTimestamp()
                    .setThumbnail(this.client.user.avatarURL());
                return msg.channel.send({
                    embed: succembed,
                });
            } catch (err) {
                if (!err) return;
                const errembed = this.client.util.embed()
                    .setTitle('**__EVAL ERROR__**')
                    .addField('INPUT <:input:372482332067758082>', `\`\`\`${code}\`\`\``)
                    .addField('OUTPUT <:output:372482366372839435>', `\`\`\`xl\n${clean(err)}\n\`\`\``)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setThumbnail(this.client.user.avatarURL());
                return msg.channel.send({
                    embed: errembed,
                });
            }
        } else return;
    }
}

module.exports = EvalCommand;