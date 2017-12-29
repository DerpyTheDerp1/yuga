const Discord = require('discord.js');
const color = require('../db/db.json').color;

/*
...store the guilds to display in an array
have variable to track current page
make method to pull 15 guilds out of array depending on page
stick those in embed
edit message containing embed
*/


exports.run = async (client, msg) => {
const guilds = Array.from(client.guilds);
    const guildList1 = new Discord.MessageEmbed()
        .setAuthor('Yuga')
        .setColor(color)
        .setThumbnail(client.user.avatarURL())
        .setTitle('Guilds List 1')
        .setDescription('Use y!serverlist <guild id> for more info on a specific guild!');
    for (const guild of client.guilds.values()) {
        if (client.guilds.size < 15) {
            guildList1.addField(guild.name, `Owner: ${guild.owner}\nGuild ID: ${guild.id}`);
        }

        if (client.guilds.size >= 15) {
            const guildList2 = new Discord.MessageEmbed()
                .setAuthor('Yuga')
                .setColor(color)
                .setThumbnail(client.user.avatarURL())
                .setTitle('Guilds List 1')
                .setDescription('Use y!serverlist <guild id> for more info on a specific guild!');
            guildList2.addField(guild.name, `Owner: ${guild.owner}\nGuild ID: ${guild.id}`);
        }

        if (client.guilds.size >= 30) {
            const guildList3 = new Discord.MessageEmbed()
                .setAuthor('Yuga')
                .setColor(color)
                .setThumbnail(client.user.avatarURL())
                .setTitle('Guilds List 1')
                .setDescription('Use y!serverlist <guild id> for more info on a specific guild!');
            guildList3.addField(guild.name, `Owner: ${guild.owner}\nGuild ID: ${guild.id}`);
        }

        if (client.guilds.size >= 45) {
            const guildList4 = new Discord.MessageEmbed()
                .setAuthor('Yuga')
                .setColor(color)
                .setThumbnail(client.user.avatarURL())
                .setTitle('Guilds List 1')
                .setDescription('Use y!serverlist <guild id> for more info on a specific guild!');
            guildList4.addField(guild.name, `Owner: ${guild.owner}\nGuild ID: ${guild.id}`);
        }

        if (client.guilds.size >= 60) {
            const guildList5 = new Discord.MessageEmbed()
                .setAuthor('Yuga')
                .setColor(color)
                .setThumbnail(client.user.avatarURL())
                .setTitle('Guilds List 1')
                .setDescription('Use y!serverlist <guild id> for more info on a specific guild!');
            guildList5.addField(guild.name, `Owner: ${guild.owner}\nGuild ID: ${guild.id}`);
        }
        if (client.guilds.size >= 75) {
            const guildList6 = new Discord.MessageEmbed()
                .setAuthor('Yuga')
                .setColor(color)
                .setThumbnail(client.user.avatarURL())
                .setTitle('Guilds List 1')
                .setDescription('Use y!serverlist <guild id> for more info on a specific guild!');
            guildList6.addField(guild.name, `Owner: ${guild.owner}\nGuild ID: ${guild.id}`);
        }

        if (client.guilds.size >= 120) {
            const guildList7 = new Discord.MessageEmbed()
                .setAuthor('Yuga')
                .setColor(color)
                .setThumbnail(client.user.avatarURL())
                .setTitle('Guilds List 1')
                .setDescription('Use y!serverlist <guild id> for more info on a specific guild!');
            guildList7.addField(guild.name, `Owner: ${guild.owner}\nGuild ID: ${guild.id}`);
        }

        if (client.guilds.size >= 150) {
            const guildList8 = new Discord.MessageEmbed()
                .setAuthor('Yuga')
                .setColor(color)
                .setThumbnail(client.user.avatarURL())
                .setTitle('Guilds List 1')
                .setDescription('Use y!serverlist <guild id> for more info on a specific guild!');
            guildList8.addField(guild.name, `Owner: ${guild.owner}\nGuild ID: ${guild.id}`);
        }
    }

    let message = await msg.channel.send({
        embed: guildList1
    });

    await message.react('◀');
    await message.react('▶');

    const reactionListener = message.createReactionCollector(
        (reaction) => reaction.emoji.name === '◀' || reaction.emoji.name === '▶', {
            time: 60000,
            maxEmojis: 2,
            maxUsers: 1
        }
    );

    reactionListener.on('end', async collected => {
        if (collected.first() == '◀' && message.embeds.includes('guildList1')) {
            const user = collected.first().users.first();
            collected.first().remove(user);
        }
        if (collected.first() == '▶' && message.embeds.includes('guildList2') || message.embeds.includes('guildList3') || message.embeds.includes('guildList4') || message.embeds.includes('guildList5') || message.embeds.includes('guildList6') || message.embeds.includes('guildList7') || message.embeds.includes('guildList8')) {
            if (message.embeds.includes('guildList1')) {
                message = await message.edit({
                    embed: guildList2
                });
            }

            if (message.embeds.includes('guildList2')) {
                message = await message.edit({
                    embed: guildList3
                });
            }

            if (message.embeds.includes('guildList3')) {
                message = await message.edit({
                    embed: guildList4
                });
            }

            if (message.embeds.includes('guildList4')) {
                message = await message.edit({
                    embed: guildList5
                });
            }

            if (message.embeds.includes('guildList5')) {
                message = await message.edit({
                    embed: guildList6
                });
            }

            if (message.embeds.includes('guildList6')) {
                message = await message.edit({
                    embed: guildList7
                });
            }

            if (message.embeds.includes('guildList7')) {
                message = await message.edit({
                    embed: guildList8
                });
            }

            if (collected.first() == '◀' && message.embeds.includes('guildList2') || message.embeds.includes('guildList3') || message.embeds.includes('guildList4') || message.embeds.includes('guildList5') || message.embeds.includes('guildList6') || message.embeds.includes('guildList7') || message.embeds.includes('guildList8')) {
                if (message.embeds.includes('guildList2')) {
                    message = await message.edit({
                        embed: guildList1
                    });
                }

                if (message.embeds.includes('guildList3')) {
                    message = await message.edit({
                        embed: guildList2
                    });
                }

                if (message.embeds.includes('guildList4')) {
                    message = await message.edit({
                        embed: guildList3
                    });
                }

                if (message.embeds.includes('guildList5')) {
                    message = await message.edit({
                        embed: guildList4
                    });
                }

                if (message.embeds.includes('guildList6')) {
                    message = await message.edit({
                        embed: guildList5
                    });
                }

                if (message.embeds.includes('guildList7')) {
                    message = await message.edit({
                        embed: guildList6
                    });
                }

                if (message.embeds.includes('guildList8')) {
                    message = await message.edit({
                        embed: guildList7
                    });
                }
            }
        }
    });
};