const { Command } = require('discord-akairo');
const { get } = require('snekfetch');

class AchievementCommand extends Command {
    constructor() {
        super('achievement', {
            aliases: ['achievement'],
            args: [
                {
                    id: 'title',
                    type: 'string'
                },

                {
                    id: 'contents',
                    type: 'string'
                }
            ],
            split: ' | '
        });

        this.help = {
            'help': {
                name: 'Achievement',
                description: 'Creates a Minecraft achievement from input text',
                category: 'Fun',
                usage: 'y!achievement <title> | <text>\ny!achievement <text>',
                requiredPerms: 'None'
            }
        };
    }

    exec(msg, args) {
        let title = args.title,
            contents = args.contents;
        !contents ? [title, contents] = ['Achievement Get!', args.title] : title = args.title, contents = args.contents;

        const rnd = Math.floor((Math.random() * 39) + 1);

        if (title.length > 22 || contents.length > 22) return msg.reply('Sorry, the max length is 22 characters long.');
        get(`https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`)
            .then(r => msg.channel.send('', {
                files: [{
                    attachment: r.body,
                }],
            }));
        msg.delete();
    }
}

module.exports = AchievementCommand;