const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const fs = require('fs');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { COLOR } = require('../config.json')
module.exports = {
  name: "smug",
  aliases: ["smug"],
  description: "Scary...",
  async execute(message) {
    let commands = message.client.commands.array();
    const GIF = await neko.sfw.smug();
      const embed = new Discord.MessageEmbed()
      .setColor(COLOR)
      .setTitle(`${message.author.username}`)
      .setImage(GIF.url)
      return message.channel.send(embed);
  }
};
