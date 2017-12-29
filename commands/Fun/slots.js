var slot1 = [":pear:", ":taco:", ":grape:", ":apple:", ":tomato:", ":strawberry:", ":watermelon:", ":lemon:", ":cookie:"];
var slott1 = slot1;
var slot1a = slott1[Math.floor(Math.random() * slott1.length)]
console.log(slot1a + ' generated')
JSON.stringify(slot1a)


var prefix = "y!"

var slot2 = [":pear:", ":taco:", ":grape:", ":apple:", ":tomato:", ":strawberry:", ":watermelon:", ":lemon:", ":cookie:"];
var slott2 = slot2;
var slot2a = slott2[Math.floor(Math.random() * slott2.length)]
console.log(slot2a + ' generated')
JSON.stringify(slot2a)

var slot3 = [":pear:", ":taco:", ":grape:", ":apple:", ":tomato:", ":strawberry:", ":watermelon:", ":lemon:", ":cookie:"];
var slott3 = slot3;
var slot3a = slott3[Math.floor(Math.random() * slott3.length)]
console.log(slot3a + ' generated')
JSON.stringify(slot3a)

exports.run = (client, msg, args) => {
  if (!msg.content.startsWith(prefix)) return;
  msg.channel.send("**" + msg.author + "**" + " rolled the slots... \n \n" + slot1a + "|" + slot2a + "|" + slot3a)
}