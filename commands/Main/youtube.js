const search = require('youtube-search');
const Discord = require('discord.js');

const opts = {
    maxResults: 1,
    key: process.env.YTKEY
};

exports.run = (client, msg, args) => {
    const searchTerm = args.join(' ');
    if (!searchTerm) return msg.reply('Must specify a search term!');
    else {
        search(searchTerm, opts, function (err, result) {
            if (err) msg.reply(`An error ocurred!\n\n\`\`\`${err.message}\`\`\``);
            const video = result[0];
            const resultEmbed = new Discord.MessageEmbed()
                .setAuthor(`[${video.channelTitle}](https://www.youtube.com/channel/${encodeURIComponent(video.channelId)})`)
                .setTitle(video.title)
                .setThumbnail(video.thumbnails.default.url)
                .setDescription(video.description)
                .setTimestamp(video.publishedAt)
                .setURL(video.link);
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