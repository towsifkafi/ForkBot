const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { COLOR } = require('../config.json')
module.exports = {
  name: "moderation",
  aliases: ["mod"],
  description: "Shows your or others avatar...",
  async execute(message) {
    let commands = message.client.commands.array();
    let PREFIX = await message.client.prefix(message)
    let modEmbed = new MessageEmbed()
      .setTitle(`‼ Moderation`)
      .setDescription("Moderation commands")
      .setColor(COLOR)
      .addField('Ban/Kick', `\`${PREFIX}ban\`, \`${PREFIX}kick\`, \`${PREFIX}mute\`, \`${PREFIX}unmute\`, \`${PREFIX}purge\`, \`${PREFIX}slowmode\`, \`${PREFIX}announce\`, \`${PREFIX}poll\``, true)
      .addField('Say/Embed', `\`${PREFIX}say\`, \`${PREFIX}serverinfo\`, \`${PREFIX}userinfo\`, \`${PREFIX}roleinfo\`, \`${PREFIX}setnick\`, \`${PREFIX}transcript\`, \`${PREFIX}steal\``)
    modEmbed.setTimestamp();
    message.channel.send(modEmbed)
    
  }
};
