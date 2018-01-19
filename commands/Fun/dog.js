const Discord = require('discord.js');
const snekfetch = require('snekfetch');

exports.run = async (client, msg) => {
   let res = await snekfetch.get('http://random.dog/woof.json');
        while (res.body.file.includes('.mp4') || res.body.file.includes('.gif')) {
           res = await snekfetch.get('http://random.dog/woof.json');
        }
        const embed = new Discord.MessageEmbed()
            .setImage(res.body.file);
        msg.channel.send({
            embed
        });
    };

exports.help = {
    'help': {
        name: 'Dog',
        description: 'Returns a randomized image of a dog =D',
        category: 'Fun',
        usage: 'y!dog',
        requiredPerms: 'None'
    }
};