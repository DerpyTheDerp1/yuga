const slotOptions = ['🍐', '🌮', '🍇', '🍎', '🍅', '🍓', '🍉', '🍋', '🍪'];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const slot1 = slotOptions[randomInt(0, 9)];
JSON.stringify(slot1);

const slot2 = slotOptions[randomInt(0, 9)];
JSON.stringify(slot2);

const slot3 = slotOptions[randomInt(0, 9)];
JSON.stringify(slot3);

exports.run = async(client, msg) => {
  slotMessage = await msg.channel.send(`**${msg.author.username}** rolled the slots!`);
  await slotMessage.edit(`**${msg.author.username}** rolled the slots!\n`);
  await slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n`);
  await slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1}`);
  await slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1} | ${slot2}`);
  await slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1} | ${slot2} |`);
  await slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1} | ${slot2} | ${slot3}`);
  if (slot1 == slot2 && slot1 == slot3 && slot2 == slot3) {
    await slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1} | ${slot2} | ${slot3}\n\nYou won!`);
  } else {
    await slotMessage.edit(`**${msg.author.username}** rolled the slots!\n\n${slot1} | ${slot2} | ${slot3}\n\nYou lost!\nBetter luck next time.`);
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