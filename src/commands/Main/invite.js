exports.run = (client, msg) => {
  const link = 'https://discordapp.com/oauth2/authorize?client_id=294141889010204684&scope=bot&permissions=8';
  msg.reply(`Invite link: ${link}`);
};