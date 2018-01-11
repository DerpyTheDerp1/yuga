let prefix = '';

const { runCommand, cmdLogger, checkDm } = require('../functions/index.js');

let command = '';

exports.run = async(client, msg) => {
    if (client.user.username == 'Yuga!') prefix == 'y!';
    if (client.user.username == 'Yuga Testing') prefix == 'yt!';

    let args = msg.content.split(' ').slice(1);
    command = msg.content.split(' ')[0];
    //Checking if it's a bot speaking & ignores it
    if (msg.author.bot) return;

    //Checking if commands are in DMs or msg.guild is undefined.
    checkDm(prefix, msg);

    //Prefix Checker #1: Command Only
    if (msg.content.startsWith(prefix)) {
        command = command.slice(prefix.length);
        await cmdLogger(client, msg, '1');
        await runCommand(client, msg, command, args);
    }

    //Prefix checker #3: Mentions
  else if (msg.content.startsWith(`<@${client.user.id}>`) && msg.mentions.everyone == false) {
        const content = msg.content.split(' ');
        command = content[1];
        const leftovers = content.slice(2);
        args = [];
        for (const i in leftovers) {
            args.push(leftovers[i]);
        }
        await cmdLogger(client, msg, '3');
        await runCommand(client, msg, command, args);
    } else return;
    //Code to do nothing if there is no prefix. All other messages are ignored thus.
};
