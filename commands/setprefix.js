const prefixes = require('../events/ready.js').prefixes;

exports.run = (client, msg, args) => {
    const prefix = args.join(' ');
    prefixes.sync().then(() => {
        prefixes.update({
                prefix: prefix
            }, {
                where: {
                   GuildID: msg.guild.id
                }
            })
            .success(() => {
                msg.reply(`Set prefix for this server to: ${prefix}`);
            })
            .error(err => {
                msg.reply(`Failure, error:\n\n\`\`\`${err}\`\`\``)
            });
    });
};