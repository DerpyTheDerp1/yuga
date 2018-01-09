const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone: true
});
const { eventLoader } = require('functions');

//Event Handler
eventLoader(client);

client.login(process.env.TOKEN);
