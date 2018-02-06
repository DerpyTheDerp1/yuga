exports.run = (client, msg) => {
    const user = msg.mentions.users.first();
    const guild = msg.guild;
    let mutedRole = guild.roles.find('name', 'Muted')
    if (!mutedRole) return;
    guild.member(user).roles.remove(mutedRole)
    msg.channel.send(`Unmuted ${user} successfully!`)
}