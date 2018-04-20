const { AkairoClient } = require('discord-akairo');

const client = new AkairoClient({
    automateCategories: true,
    ownerID: '215509157837537280',
    prefix: 'y!',
    commandDirectory: './commands/',
    listenerDirectory: './listeners/'
}, {
    disableEveryone: true
});

module.exports = client;
client.login(process.env.TOKEN);