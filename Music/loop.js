const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js")
const { COLOR } = require('../config.json') 
module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "Toggle music loop",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(new MessageEmbed().setColor(COLOR).setDescription("There is nothing playing.")).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel.send(new MessageEmbed().setTitle('🔁 Loop').setColor(COLOR).addField('Enabled', queue.loop ? "**True**" : "**False**")).catch(console.error);
  }
};
