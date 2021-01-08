const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js")
const { COLOR } = require('../config.json') 
module.exports = {
  name: "pause",
  description: "Pause the currently playing music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(new MessageEmbed().setColor(COLOR).setDescription("There is nothing playing.")).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      //`${message.author} ⏸ paused the music.`
      return queue.textChannel.send(new MessageEmbed().setTitle('⏸ Pause').setColor(COLOR).setDescription(`${message.author} paused the music.`)).catch(console.error);
    }
  }
};
