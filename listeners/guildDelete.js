const { Listener } = require('discord-akairo');
const superagent = require('superagent');
let prefix = '';

class guildDeleteListener extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    async exec(guild) {
        if (this.client.user.username == 'Yuga Testing') prefix = 'yt!';

        if (this.client.user.username == 'Yuga!') prefix = 'y!';

        await this.client.user.setActivity(`for ${prefix}help | ${this.client.guilds.size} servers`, {
            type: 'WATCHING',
        });
        guild.owner.send('Hi! We see you kicked our bot. Could you explain briefly to Striker#1337 why, and we can consider improvements and such. Thanks!');
        this.client.channels.get('428587986683297822').send(`Kick from: ${guild.name}\nOwner: ${guild.owner.user.username}#${guild.owner.user.discriminator} (ID: ${guild.owner.id})`);
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

module.exports = guildDeleteListener;