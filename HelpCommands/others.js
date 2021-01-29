const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { COLOR } = require('../config.json')
module.exports = {
  name: "others",
  aliases: ["others"],
  description: "Shows your or others avatar...",
  async execute(message) {
    let commands = message.client.commands.array();
    let PREFIX = await message.client.prefix(message)
    let otherEmbed = new MessageEmbed()
      .setTitle(`🧵 Others`)
      .setDescription('Other Commands')
      .setColor(COLOR)
      .addField('🎃 Status', `\`${PREFIX}serverinfo\`, \`${PREFIX}userinfo\`, \`${PREFIX}ping\`, \`${PREFIX}uptime\`, \`${PREFIX}status\``)
      .addField('🎐 Other', `\`${PREFIX}say\`, \`${PREFIX}avatar\`, \`${PREFIX}invite\`, \`${PREFIX}support\``)
      .addField('📨 RSS', `\`${PREFIX}rss bdzone\``)
      .addField('💀 BhootFM', `\`${PREFIX}bhootfm\``, true)
      otherEmbed.setTimestamp()
    message.channel.send(otherEmbed)
    
  }
};
