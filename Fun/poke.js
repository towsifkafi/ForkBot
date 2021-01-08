const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const fs = require('fs');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { COLOR } = require('../config.json')
module.exports = {
  name: "poke",
  aliases: ["poke"],
  description: "OUCH....",
  async execute(message) {
    let commands = message.client.commands.array();
    let taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size) {
      const GIF = await neko.sfw.poke();
      const embed = new Discord.MessageEmbed()
      .setColor(COLOR)
      .setTitle(`${message.author.username} poked themselves`)
      .setImage(GIF.url)
      return message.channel.send(embed);
    }

    console.log(taggedUser)
    const GIF = await neko.sfw.poke();
    const embed = new Discord.MessageEmbed()
    .setColor(COLOR)
    .setTitle(`${message.author.username} poked ${taggedUser.username}`)
    .setImage(GIF.url)
    message.channel.send(embed);
  }
};
