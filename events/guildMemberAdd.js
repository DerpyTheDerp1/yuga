exports.run = (client, member) => {
    const guild = member.guild;
    const memberRole = guild.roles.find('name', 'Member');
    if (memberRole) member.addRole(member);
    if (!memberRole) return undefined;
    const channel = guild.channels.find('name', 'yuga-welcome');
    if (!channel) return;
    channel.send(`Welcome to ${guild.name}, ${member}!`);
};