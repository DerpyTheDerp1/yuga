const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone: true
});
const fs = require('fs');

//Event Handler
fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const eventFunction = require(`./events/${file}.js`);
    const eventName = file.split('.')[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.login(process.env.TOKEN);
