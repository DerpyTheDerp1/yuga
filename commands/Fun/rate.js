exports.run = (client, msg, args) => {
  var argresult = args.join(' ');

  if (argresult == "Ireland") {
    msg.channel.send(`I would rate ${argresult} a \n \n 500/500`)
  }

  if (argresult == "Striker") {
    msg.channel.send(`I would rate ${argresult} a \n \n 500/500`)
  }
  var digit = ((Math.floor(Math.random() * (500 - 1 + 1))) + 1)
  var decimal = ((Math.floor(Math.random() * (99 - 0 + 1))) + 0)
  msg.channel.send(`I would rate ${argresult} a \n \n ${digit}.${decimal}/500`)
}