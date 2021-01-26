const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { PREFIX, COLOR } = require('../config.json')
module.exports = {
  name: "nsfw",
  aliases: ["nsfw"],
  description: "Shows your or others avatar...",
  execute(message) {
    let commands = message.client.commands.array();
    let adultEmbed = new MessageEmbed()
      .setTitle('🔞 NSFW')
      .setDescription('NSFW Commands')
      .setColor(COLOR)
      .addField('💄 Anime', `\`${PREFIX}anal\`, \`${PREFIX}blowjob\`, \`${PREFIX}boobs\`, \`${PREFIX}cumart\`, \`${PREFIX}cumsluts\`, \`${PREFIX}feet\`, \`${PREFIX}feetgif\`, \`${PREFIX}hentaigif\`, \`${PREFIX}kuni\`, \`${PREFIX}lesbian\`, \`${PREFIX}neko\`, \`${PREFIX}nekogif\`, \`${PREFIX}pussy\`, \`${PREFIX}spank\`, \`${PREFIX}tits\`, \`${PREFIX}trap\`, \`${PREFIX}yuri\`, \`${PREFIX}4k\``)
      .addField('💋 Other', `\`${PREFIX}pgif\`, \`${PREFIX}thigh\``)
    adultEmbed.setTimestamp()
    message.channel.send(adultEmbed)
    
  }
};
