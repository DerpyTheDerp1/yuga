exports.run = (client, member) => {
  const channel = member.guild.channels.find('name', 'yuga-goodbye');
  if (!channel) return;
  channel.send(`It's a shame to see you go, ${member.user.username}...`);
};
