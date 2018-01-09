const fs = require('fs');

exports.run = (client, msg, args) => {
    const striker = '215509157837537280';
    let format = '';
    if (msg.author.id != striker) return;
    else {
        if (msg.content.includes('js')) {
            format = 'js';
        }

        if (msg.content.includes('json')) {
            format = 'json';
        }

        const file = args.join(' ');

        fs.readFile(file, (err, data) => {
            if (err) msg.channel.send(`Failed! Error: \`\`\`${err}\`\`\``);
            msg.channel.send(`\`\`\`${format}\n${data}\`\`\``);
        });
    }
};