const { AkairoClient } = require('discord-akairo');

const client = new AkairoClient({
    allowMention: true,
    handleEdits: true,
    automateCategories: true,
    ownerID: '215509157837537280',
    prefix: 'y!',
    commandDirectory: './commands/',
    listenerDirectory: './listeners/'
}, {
    disableEveryone: true
});

client.login(process.env.TOKEN);