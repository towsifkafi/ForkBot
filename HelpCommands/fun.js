const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { PREFIX, COLOR } = require('../config.json')
module.exports = {
  name: "fun",
  aliases: ["fun"],
  description: "Shows your or others avatar...",
  execute(message) {
    let commands = message.client.commands.array();
    let funEmbed = new MessageEmbed()
      .setTitle(`🎉 Fun`)
      .setDescription('Fun Commands')
      .setColor(COLOR)
      .addField('🎈Gif', `\`${PREFIX}poke\`, \`${PREFIX}slap\`, \`${PREFIX}smug\`, \`${PREFIX}wink\`, \`${PREFIX}tickle\`, \`${PREFIX}pat\`, \`${PREFIX}hug\`, \`${PREFIX}feed\`, \`${PREFIX}cuddle\``)
      .addField('✨ Other', `\`${PREFIX}owofy\`, \`${PREFIX}pokemon\`, \`${PREFIX}baka\``)
    funEmbed.setTimestamp()
    message.channel.send(funEmbed)
    
  }
};
