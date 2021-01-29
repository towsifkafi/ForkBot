const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { COLOR } = require('../config.json')
module.exports = {
  name: "github",
  aliases: ["github"],
  description: "Shows your or others avatar...",
  async execute(message) {
    let commands = message.client.commands.array();
    let funEmbed = new MessageEmbed()
      .setTitle(`<:Github512:800564573685547038> Github`)
      .setColor(COLOR)
      .setDescription('Check out the Github repository of this bot. You can find this bot\'s source code there if you want to host this bot as your own or you just want to take a look at the code. OwO ')
      .setThumbnail('https://miro.medium.com/max/719/1*WaaXnUvhvrswhBJSw4YTuQ.png')
      .addField('📦 Repository', '[https://github.com/Towsif12/ForkBot](https://github.com/Towsif12/ForkBot)', true)
      .addField('🙎‍♂️ User', '[https://github.com/Towsif12](https://github.com/Towsif12)', true)
    funEmbed.setTimestamp()
    message.channel.send(funEmbed)
    
  }
};
