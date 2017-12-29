exports.run = (client, msg, args) => {
    let server = "308278703283240960"
    let guild = client.guilds.get(server)

    let channel = guild.channels.filter(c => c.permissionsFor(guild.me).has('SEND_msgS')).first()


    let invite = channel.createInvite({
            maxAge: 0
        })
        .then((invite) => {
            msg.channel.send(`Here is an invite for the official server (Striker's Coding Den) | ${invite}`)
        });
}
