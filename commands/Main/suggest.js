const {
    MessageEmbed
} = require('discord.js')

exports.run = (client, msg, args) => {
    const [commandName, description, category, usage, requiredPerms] = args.join(' ').split(', ')
    if (!commandName || !description || !category || !usage || !requiredPerms) return msg.reply('Missing arguments')
    else {
        const suggestionEmbed = new MessageEmbed()
            .setTitle('Suggestion')
            .setThumbnail(msg.author.displayAvatarURL)
            .setAuthor(msg.author.tag)
            .addField('Command Name', commandName, true)
            .addField('Description', description, true)
            .addField('Categpry', category, true)
            .addField('Usage', usage, true)
            .addField('Required Perms', requiredPerms, true)
            .setTimestamp()
        client.channels.get('409741553918279700').send('@here Please vote for this command suggestion!', {
            embed: suggestionEmbed
        })
    }
}

exports.help = {
    'help': {
        name: 'Suggest',
        description: 'Suggests a command for Yuga!',
        category: 'Main',
        usage: 'y!suggest commandName, description, category, usage, requiredPerms\n\nFor the description, please state clearly what the command should do.\nFor the category, think what category the command should be in.\nFor usage we can work that out, but give us an idea please.\nFor required perms, most of the time it can stay as none.',
        requiredPerms: 'None'
    }
}