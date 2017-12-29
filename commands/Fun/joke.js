exports.run = (client, msg) => {
    const jokes = require('../db/db.json').jokes;
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    JSON.stringify(joke);
    msg.channel.send(joke);
};
