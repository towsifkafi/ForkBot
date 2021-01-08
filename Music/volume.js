const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js")
const { COLOR } = require('../config.json') 
module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Change volume of currently playing music",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    //"There is nothing playing."
    if (!queue) return message.reply(new MessageEmbed().setColor(COLOR).setDescription("There is nothing playing.")).catch(console.error);
    if (!canModifyQueue(message.member))
    //"You need to join a voice channel first!"
      return message.reply(new MessageEmbed().setColor(COLOR).setDescription("You need to join a voice channel first!")).catch(console.error);

    if (!args[0]) return message.reply(new MessageEmbed().setTitle('🔉 Volume').setColor(COLOR).addField('Current Volume', queue.volume)).catch(console.error);
    if (isNaN(args[0])) return message.reply("Please use a number to set volume.").catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0 )
    //"Please use a number between 0 - 100."
      return message.channel.send(new MessageEmbed().setColor(COLOR).setDescription("Please use a number between 0 - 100.")).catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(new MessageEmbed().setTitle('🔉 Volume').setColor(COLOR).setDescription(`${message.author} set the volume`).addField('Current Volume', args[0])).catch(console.error);
  }
};
