const { MessageEmbed, MessageAttachment } = require("discord.js");
const { COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "allcommands",
  aliases: ["allcmd"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    let PREFIX = await message.client.prefix(message)
    cmds = []
    commands.forEach((cmd) => {
      cmds.push('..' + cmd.name)
    });
    //console.log(cmds.join(', '))
    message.channel.send(`All Commands\n\`\`\`${cmds.join(', ')}\`\`\``)
  }

};
