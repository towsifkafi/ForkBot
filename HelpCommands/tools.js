const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { PREFIX, COLOR } = require('../config.json')
module.exports = {
  name: "tools",
  aliases: ["tools"],
  description: "Shows your or others avatar...",
  execute(message) {
    let commands = message.client.commands.array();
    let toolsEmbed = new MessageEmbed()
      .setTitle('🔧 Tools')
      .setDescription('Tools Commands')
      .setColor(COLOR)
      .addField('🔧 Commands', `\`${PREFIX}anime\`, \`${PREFIX}djs\`, \`${PREFIX}npm\`, \`${PREFIX}shortlink\`, \`${PREFIX}urban\`, \`${PREFIX}weather\`, \`${PREFIX}webhook\`, \`${PREFIX}wiki\`, \`${PREFIX}yt\``)
    toolsEmbed.setTimestamp()
    message.channel.send(toolsEmbed)
    
  }
};
