let prefix = '';
const { runCommand, cmdLogger, checkDm } = require('../functions/index.js');
let command = '';
exports.run = async(client, old, msg) => {
    if (client.user.username == 'Yuga Testing') prefix = 'yt!';
    if (client.user.username == 'Yuga!') prefix = 'y!';
    let args = msg.content.split(' ').slice(1);
     command = msg.content.split(' ')[0];
    command = command.slice(prefix.length);
    checkDm(prefix, msg);
    if (msg.author.bot) return;
    //Prefix checker #2: Edited command messages
    if (msg.content.startsWith(prefix)) {
        await runCommand(command);
        //End Running Commands
        await cmdLogger(client, msg, '2');
    }
    //Prefix Checker #4: Mention edited
    if (msg.content.startsWith(`<@${client.user.id}>`) && msg.mentions.everyone == false) {

       const content = msg.content.split(' ');
        console.log(content);
       command = content[1];
       const leftovers = content.slice(2);
        args = [];
        for (const i in leftovers) {
            args.push(leftovers[i]);
        }
        await runCommand(client, msg, command, args)
        await cmdLogger(client, msg, '4');
    } else return;
};
