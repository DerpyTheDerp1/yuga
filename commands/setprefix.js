const prefixes = require('../events/ready.js');

exports.run = async(client, msg, args) => {
    const prefix = args.join(' ');
    prefixes.sync();

    await prefixes.update({
        prefix: prefix
    }, {
        where: {
            guildID: msg.guild.id
        }
    });

    msg.reply(`Prefix for this server set to: ${prefix}`);
};