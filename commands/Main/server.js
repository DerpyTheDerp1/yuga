exports.run = (client, msg) => {
    const server = '308278703283240960';
    const guild = client.guilds.get(server);

    const channel = guild.channels.filter(c => c.permissionsFor(guild.me).has('SEND_MESSAGES')).first();


    channel.createInvite({
            maxAge: 0
        })
        .then((invite) => {
            msg.channel.send(`Here is an invite for the official server (Striker's Coding Den) | ${invite}`);
        });
};
