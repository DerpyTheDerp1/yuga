const ready = require('../events/ready');
const prefixes = ready.prefixes;

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