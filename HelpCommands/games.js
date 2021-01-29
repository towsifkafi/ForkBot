const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { COLOR } = require('../config.json')
module.exports = {
  name: "games",
  aliases: ["games"],
  description: "Shows your or others avatar...",
  async execute(message) {
    let commands = message.client.commands.array();
    let PREFIX = await message.client.prefix(message)
    let gamesEmbed = new MessageEmbed()
      .setTitle('🎲 Games')
      .setDescription('Games Commands')
      .setColor(COLOR)
      .addField('🎲 Commands', `\`${PREFIX}8ball\`, \`${PREFIX}rps\`, \`${PREFIX}tictactoe\`, \`${PREFIX}truthordare (${PREFIX}tod)\`, \`${PREFIX}snake\``)
    gamesEmbed.setTimestamp()
    message.channel.send(gamesEmbed)
    
  }
};
