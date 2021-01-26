const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "iq",
  aliases: ["iq"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
         try {

    const iq = Math.floor(Math.random() * 226);
    const embed = new MessageEmbed()

    .setTitle(":brain: IQ Test:")
    .setDescription(`:bulb:   ${user}'s  **IQ is:**   \`${iq}\`  `)
    .setColor("FF0000")
    .setThumbnail("https://media.giphy.com/media/l44QzsOLXxcrigdgI/giphy.gif")
    .setTimestamp()
    .setColor(COLOR);
    message.channel.send(embed);

        } catch (err) {
    message.channel.send({embed: {
      color: `${COLOR}`,
      description: `Something went wrong...`
    }})
  }
  }

};
