exports.run = (client, member) => {
    const guild = member.guild;
    const channel = member.guild.channels.find('name', 'yuga-welcome');
    if (!channel) return;
    channel.send(`Welcome to ${guild.name}, ${member}!`);
};