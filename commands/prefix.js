const prefixes = require('../events/ready.js');

exports.run = async(client, msg) => {
    prefix = await prefixes.findOne({
        where: {
            guildID: msg.guild.id
        }
    });

    if (!prefix) return;
    else {
        msg.reply(`Prefix for this server is: ${prefix}`);
    }
};