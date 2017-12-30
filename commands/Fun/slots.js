
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.run = async(client, msg) => {
const slotOptions = ['🍐', '🌮', '🍇', '🍎', '🍅', '🍓', '🍉', '🍋', '🍪'];

let slot1 = slotOptions[randomInt(0, 8)];
JSON.stringify(slot1);

let slot2 = slotOptions[randomInt(0, 8)];
JSON.stringify(slot2);

let slot3 = slotOptions[randomInt(0, 8)];
JSON.stringify(slot3);
  slotMessage = await msg.channel.send(`**${msg.author.username}** rolled the slots!`);
 slotMessage.edit(`**${msg.author.username}** rolled the slots!\n`);
 slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n`);
  slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1}`);
  slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1} | ${slot2}`);
  slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1} | ${slot2} |`);
  slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1} | ${slot2} | ${slot3}`);
  if (slot1 == slot2 && slot1 == slot3 && slot2 == slot3) {
    slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1} | ${slot2} | ${slot3}\n\nYou won!`);
  } else {
    slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1} | ${slot2} | ${slot3}\n\nYou lost!\nBetter luck next time.`);
  }
};

exports.help = {
  'help': {
    name: 'Slots',
    description: 'Play a game of slots!',
    category: 'Fun',
    usage: 'y!slots',
    requiredPerms: 'None'
  }
};
