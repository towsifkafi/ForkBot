const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js")
const { COLOR } = require('../config.json') 
module.exports = {
  name: "stop",
  description: "Stops the music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
//
    if (!queue) return message.reply(new MessageEmbed().setColor(COLOR).setDescription("There is nothing playing.")).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    //`${message.author} ⏹ stopped the music!`
    queue.textChannel.send(new MessageEmbed().setTitle('⏹ Stop').setColor(COLOR).setDescription(`${message.author} stopped the music!`)).catch(console.error);
  }
};
