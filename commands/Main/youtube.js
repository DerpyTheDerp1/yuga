const search = require('youtube-search');
const Discord = require('discord.js');

const opts = {
    maxResults: 1,
    key: process.env.YTKEY
};

exports.run = async (client, msg, args) => {
    const searchTerm = args.join(' ');
    if (!searchTerm) return msg.reply('Must specify a search term!');
    else {
        await search(searchTerm, opts, function (err, results) {
            if (err) msg.reply(`An error ocurred!\n\n\`\`\`${err.message}\`\`\``);
            const resultEmbed = new Discord.MessageEmbed()
                .setAuthor(`[${results[0].channelTitle}](https://www.youtube.com/channel/${encodeURIComponent(results[0].channelId)})`)
                .setTitle(results[0].title)
                .setThumbnail(results[0].thumbnails.default.url)
                .setDescription(results[0].description)
                .setTimestamp(results[0].publishedAt)
                .setURL(results[0].link);
            msg.channel.send({
                embed: resultEmbed
            });
        });
    }
};

exports.help = {
    'help': {
        name: 'Youtube',
        description: 'Searches YouTube for the first resulting video.',
        category: 'Main',
        usage: 'y!youtube <search term>',
        requiredPerms: 'None'
    }
};