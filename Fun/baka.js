const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const fs = require('fs');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { COLOR } = require('../config.json')
module.exports = {
  name: "baka",
  aliases: ["baka"],
  description: "BAK BAK BAKA...",
  async execute(message) {
    let commands = message.client.commands.array();
    const GIF = await neko.sfw.baka();
      const embed = new Discord.MessageEmbed()
      .setColor(COLOR)
      .setTitle(`BAKA! BAKA! BAKA!`)
      .setImage(GIF.url)
      return message.channel.send(embed);
  }
};
