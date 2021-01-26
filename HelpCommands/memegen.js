const { MessageEmbed, MessageMentions } = require("discord.js");
const fs = require('fs');
const { PREFIX, COLOR } = require('../config.json')
module.exports = {
  name: "memegen",
  aliases: ["memegen"],
  description: "Shows your or others avatar...",
  execute(message) {
    let commands = message.client.commands.array();
    let memeEmbed = new MessageEmbed()
      .setTitle('🤣 Meme Gen')
      .setDescription('Meme/Image Generation Commands')
      .setColor(COLOR)
      .addField('📷 Image Generator', `\`${PREFIX}qrcode\``)
      .addField('🤣 Meme Genenerator', `\`${PREFIX}meme\`, \`${PREFIX}carreverse\`, \`${PREFIX}changemymind\`, \`${PREFIX}eject\`, \`${PREFIX}meeting\`, \`${PREFIX}water\`, \`${PREFIX}8bit\`, \`${PREFIX}16bit\`, \`${PREFIX}32bit\`, \`${PREFIX}beautify\`, \`${PREFIX}bed\`, \`${PREFIX}blur\`, \`${PREFIX}rip\`, \`${PREFIX}trigger\`, \`${PREFIX}wanted\`, \`${PREFIX}youtube\``)
    memeEmbed.setTimestamp()
    message.channel.send(memeEmbed)
    
  }
};
