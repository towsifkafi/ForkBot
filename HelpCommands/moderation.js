const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { PREFIX, COLOR } = require('../config.json')
module.exports = {
  name: "moderation",
  aliases: ["mod"],
  description: "Shows your or others avatar...",
  execute(message) {
    let commands = message.client.commands.array();
    let modEmbed = new MessageEmbed()
      .setTitle(`‼ Moderation`)
      .setDescription("Moderation commands")
      .setColor(COLOR)
      .addField('Ban/Kick', `\`${PREFIX}ban\`, \`${PREFIX}kick\`, \`${PREFIX}purge\``, true)
      .addField('Say/Embed', `\`${PREFIX}say\`, \`${PREFIX}serverinfo\`, \`${PREFIX}userinfo\`, \`${PREFIX}steal\``)
    modEmbed.setTimestamp();
    message.channel.send(modEmbed)
    
  }
};
