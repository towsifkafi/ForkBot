const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js")
const { COLOR } = require('../config.json') 
module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Skip the currently playing song",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply(new MessageEmbed().setColor(COLOR).setDescription("There is nothing playing that I could skip for you.")).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    //`${message.author} ⏭ skipped the song`
    queue.textChannel.send(new MessageEmbed().setTitle('⏩ Skip').setColor(COLOR).setDescription(`${message.author} skipped the song`)).catch(console.error);
  }
};
