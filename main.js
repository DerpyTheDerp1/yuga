const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone: true
});
const { eventLoader } = require('./functions/index.js');

//Event Handler
eventLoader();

client.login(process.env.TOKEN);
