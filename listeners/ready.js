const { Listener } = require('discord-akairo');
const superagent = require('superagent');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    exec() {
        let prefix = '';
            const guilds = this.client.guilds.size;

            if (this.client.user.username == 'Yuga!') prefix = 'y!';
            if (this.client.user.username == 'Yuga Testing') prefix = 'yt!';

            this.client.user.setActivity(`for ${prefix}help | ${guilds} servers`, {
                type: 'WATCHING',
            });
            console.log(`${this.client.user.username} is connected to the Discord WebSocket`);
            const channel = this.client.channels.get('428587939958882304');
            if (channel) channel.send(`${this.client.user.username} is now online!`);
            if (process.env.DBENABLED == 'no') return;
            else {
                superagent.post('https://discordbots.org/api/bots/stats')
                    .set('Authorization', process.env.DBTOKEN)
                    .send({
                        server_count: this.client.guilds && this.client.guilds.size ? this.client.guilds.size : (this.client.Guilds ? this.client.Guilds.size : Object.keys(this.client.Servers).length),
                    })
                    .then(() => console.log('Updated discordbots.org stats!'))
                    .catch(err => console.error(`Error updating discordbots.org stats: ${err.body} || ${err}`));
            }
    }
}

module.exports = ReadyListener;