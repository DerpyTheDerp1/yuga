const yt = require('simple-youtube-api');
const Discord = require('discord.js');

const youtube = new yt(process.env.YTKEY);

exports.run = async(client, msg, args) => {
    const searchTerm = args.join(' ');
    if (!searchTerm) return msg.reply('Must specify a search term!');
    else {
        youtube.searchVideos(searchTerm, 1)
            .then(results => {
                const video = results[0];
                const resultEmbed = new Discord.MessageEmbed()
                    .setAuthor(`[${video.channel.title}](https://www.youtube.com/channel/${encodeURIComponent(video.channel.id)})`)
                    .setTitle(video.title)
                    .setDescription(video.description)
                    .setTimestamp(video.publishedAt)
                    .setThumbnail(video.thumbnails.default.url)
                    .addField('Click on the link down below to watch the video!', `[Here!](${video.url})`);
                msg.channel.send({
                    embed: resultEmbed
                });
            })
            .catch(err => {
                msg.reply(`An error occured!\n\`\`\`${err.message}\`\`\``);
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