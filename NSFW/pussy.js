const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const { get } = require("snekfetch");
const nsfw = require('../schema/nsfw-status')

const fs = require('fs');
module.exports = {
  name: "pussy",
  aliases: ["pussy"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    const check = await nsfw.findOne({
      Guild: message.guild.id
    })
    if (check) {
      if (check.Status.includes('disable')) return message.channel.send('NSFW is disabled in this server.')
    }
    if (!message.channel.nsfw) return message.channel.send("🔞", "Cannot display NSFW content in a SFW channel.");
    const { body } = await get("https://nekobot.xyz/api/image?type=pussy");
    const msg = await message.channel.send(`wait......`);
    await msg.edit({
      embed: {
        "title": "Click here if the image failed to load.",
        "url": body.message,
        "color": 6192321,
        "image": {
          "url": body.message
        },
        "footer": {
          "icon_url": message.author.displayAvatarURL({ format: "png", size: 32 }),
          "text": `Requested by ${message.author.tag} | Powered by NekoBot API`
        }
      }
    });
  }

};
