const prefixes = require('../events/ready.js').prefixes;

exports.run = async (client, msg, args) => {
    const prefix = args.join(' ');
    prefixes.sync().then(async () => {
       await prefixes.update({
                prefix: prefix
            }, {
                where: {
                   GuildID: msg.guild.id
                }
            });
        msg.reply(`Set prefix for this server to: ${prefix}`);
    });
};