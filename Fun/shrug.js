const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "shrug",
  aliases: ["shrug"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    let msg = await message.channel.send('¯\\\_(ツ)_/¯')
    setTimeout(async () => {
      await msg.edit("¯\\\\-(ツ)-/¯");
      setTimeout(async () => {
        await msg.edit("¯\\_(ツ)_/¯")
        setTimeout(async () => {
          await msg.edit("¯\\\\-(ツ)-/¯");
          setTimeout(async () => {
            await msg.edit("¯\\_(ツ)_/¯")
          }, 200);
        }, 200);
      }, 200);
    }, 200);
    
  }

};
