const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const fs = require('fs');
const { invalid } = require("moment");
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { COLOR } = require('../config.json')
module.exports = {
  name: "boobs",
  aliases: ["boobs"],
  description: "NSFW",
  async execute(message) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor('#00FFFF').setDescription(text))
    }
    if (!message.channel.nsfw) return invalid('Umm....This is not a NSFW channel..Sorry!')
    const GIF = await neko.nsfw.boobs();
      const embed = new Discord.MessageEmbed()
      .setColor(COLOR)
      .setTitle(`NSFW | Boobs`)
      .setImage(GIF.url)
      return message.channel.send(embed);
  }
};
