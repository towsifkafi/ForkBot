const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { COLOR } = require('../config.json')
module.exports = {
  name: "fun",
  aliases: ["fun"],
  description: "Shows your or others avatar...",
  async execute(message) {
    let commands = message.client.commands.array();
    let PREFIX = await message.client.prefix(message)
    let funEmbed = new MessageEmbed()
      .setTitle(`🎉 Fun`)
      .setDescription('Fun Commands')
      .setColor(COLOR)
      .addField('🎈Gif', `\`${PREFIX}poke\`, \`${PREFIX}slap\`, \`${PREFIX}smug\`, \`${PREFIX}wink\`, \`${PREFIX}tickle\`, \`${PREFIX}pat\`, \`${PREFIX}hug\`, \`${PREFIX}feed\`, \`${PREFIX}cuddle\`, \`${PREFIX}wasted\`, \`${PREFIX}triggered\`, \`${PREFIX}glass\`, \`${PREFIX}gay\`, \`${PREFIX}facepalm\``)
      .addField('✨ Other', `\`${PREFIX}owofy\`, \`${PREFIX}pokemon\`, \`${PREFIX}baka\`, \`${PREFIX}ascii\`, \`${PREFIX}cowsay\`, \`${PREFIX}emojify\`, \`${PREFIX}insult\`, \`${PREFIX}iq\`, \`${PREFIX}shrug\``)
    funEmbed.setTimestamp()
    message.channel.send(funEmbed)
    
  }
};
