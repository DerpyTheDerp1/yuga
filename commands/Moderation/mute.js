exports.run = (client, msg) => {
    const user = msg.mentions.users.first();
    const guild = msg.guild;
    let mutedRole = guild.roles.find('name', 'Muted')
    if (!mutedRole) mutedRole = guild.roles.create({
        data: {
            name: 'Muted',
            color: 'BLACK',
        },
        reason: 'Muted role non existent',
    })
    guild.channels.filter(c => !c.permissionOverwrites.exists('id', mutedRole.id)).forEach(channels => {
        channels.overwritePermissions(mutedRole.id, {
            SEND_MESSAGES: false
        })
    });

    guild.member(user.roles.add(mutedRole.id))
    msg.delete()
    msg.reply(`Muted ${user} successfully.`)
}