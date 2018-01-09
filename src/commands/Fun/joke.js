exports.run = (client, msg) => {
    const { jokes } = require('db').jokes;
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    JSON.stringify(joke);
    msg.channel.send(joke);
};

exports.help = {
    'help': {
        name: 'Joke',
        description: 'Gives one of our hilarious jokes',
        category: 'Fun',
        usage: 'y!joke',
        requiredPerms: 'None'
    }
};