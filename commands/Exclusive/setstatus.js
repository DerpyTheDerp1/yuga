exports.run = (client, msg, args) => {
  if (msg.author.id !== '215509157837537280') {
    msg.channel.send(answerr)
    console.log('User ' + msg.author + 'tried to set status to ' + argresult)
  } else {
    console.log('Setting status to:' + argresult);
    if (!argresult) argresult = 'online';
    client.user.setStatus(argresult);
    msg.channel.sendmsg('Success: status changed to ' + argresult + ' by ' + msg.author);
  }
}