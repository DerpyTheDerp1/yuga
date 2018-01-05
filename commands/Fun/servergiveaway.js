exports.run = (client, msg) => {
if(msg.author.id !== msg.guild.owner.id){
msg.channel.send('Only owners can run giveaways!')
return;
}
array = []
msg.guild.members.forEach(member => {
array.push(member.user.tag) 
})
var rand = array[Math.floor(Math.random () * array.length)]
msg.channel.send(rand).then(m => {
 m.split('#')
m.edit(array)
})
}
