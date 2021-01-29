const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const { get } = require("snekfetch");
const nsfw = require('../schema/nsfw-status')

const fs = require('fs');
module.exports = {
  name: "boobs",
  aliases: ["boobs"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    const check = await nsfw.findOne({
      Guild: message.guild.id
    })
    if (check) {
      if (check.Status.includes('disable')) return message.channel.send('NSFW is disabled in this server.')
    }
    let commands = message.client.commands.array();
    if (!message.channel.nsfw) return message.channel.send("🔞", "Cannot display NSFW content in a SFW channel.");
    const msg = await message.channel.send(`**${message.member.displayName}** is looking for boobies...`);
    const { body } = await get("http://api.oboobs.ru/boobs/0/1/random");
    await msg.edit({
      embed: {
        "title": "Click here if the image failed to load.",
        "url": `http://media.oboobs.ru/${body[0].preview}`,
        "color": 6192321,
        "image": {
          "url": `http://media.oboobs.ru/${body[0].preview}`
        },
        "footer": {
          "icon_url": message.author.displayAvatarURL({ format: "png", size: 32 }),
          "text": `Requested by ${message.author.tag} | Powered by oboobs.ru`
        }
      }
    });
  }

};
