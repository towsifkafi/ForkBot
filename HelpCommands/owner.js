const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { PREFIX, COLOR, OWNERS } = require('../config.json')
module.exports = {
  name: "owner",
  aliases: ["owner"],
  description: "Shows your or others avatar...",
  execute(message) {
    let commands = message.client.commands.array();
    if(!OWNERS.includes(message.author.id)) return message.channel.send('This command is only for the bot owners.')
    let ownerEmbed = new MessageEmbed()
      .setTitle(`🛠 Owner`)
      .setDescription('Commands')
      .setColor(COLOR)
      .addField('Tools', `\`${PREFIX}dm\`, \`${PREFIX}eval\`, \`${PREFIX}exec\``)
      ownerEmbed.setTimestamp()
    message.channel.send(ownerEmbed)
    
  }
};
