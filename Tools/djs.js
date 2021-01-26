const { MessageEmbed, MessageAttachment } = require("discord.js");
const axios = require("axios");
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "djs",
  aliases: ["docs"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    const query = args.join(" ");
    let msg = await message.channel.send('Please wait...')
    if (!query) return message.reply("Please specify a query!");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;

    axios.get(url).then(async ({ data }) => {
      if (data) {
        await msg.edit('.', { embed: data });
      }
    });
  }
};
