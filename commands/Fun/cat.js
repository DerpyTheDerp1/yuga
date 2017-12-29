const Discord = require('discord.js');
const snekfetch = require('snekfetch');
exports.run = (client, msg) => {
    snekfetch.get('http://random.cat/meow').then(res => {
        const embed = new Discord.MessageEmbed()
            .setImage(res.body.file);
        msg.channel.send({
            embed
        });
    });
};