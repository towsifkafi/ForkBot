const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { PREFIX, COLOR } = require('../config.json')
module.exports = {
  name: "support",
  aliases: ["support"],
  description: "Shows your or others avatar...",
  async execute(message) {
    let commands = message.client.commands.array();
    let funEmbed = new MessageEmbed()
      .setTitle(`🤖 Support`)
      .setDescription('If you are facing any problems while using the Bot contact us via email or join owr discord server. If have any suggestions u can also post it in the discord server.')
      .setColor(COLOR)
      .setThumbnail('https://cdn.discordapp.com/avatars/797076453686640651/294026eebd8e4a4cf5b4a654afa754b0.png?size=128')
      .addField('💁‍♂️ Support Server', '[Discord Server](https://discord.com/invite/kDaeWYj4zJ)', true)
      .addField('<:Github512:800564573685547038> Github', '[https://github.com/Towsif12/ForkBot](https://github.com/Towsif12/ForkBot)', true)
      .addField('👋 DM', '`Werewolf#0256`', true)
      .addField('📨 Email', '**team.infinity.dev12@gmail.com**', true)
    funEmbed.setTimestamp()
    message.channel.send(funEmbed)
    
  }
};
