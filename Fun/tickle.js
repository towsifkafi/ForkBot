const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const fs = require('fs');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const { COLOR } = require('../config.json')
module.exports = {
  name: "tickle",
  aliases: ["tickle"],
  description: "hehehehe....",
  async execute(message) {
    let commands = message.client.commands.array();
    let taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size) {
      const GIF = await neko.sfw.tickle();
      const embed = new Discord.MessageEmbed()
      .setColor(COLOR)
      .setTitle(`${message.author.username} tickled themselves`)
      .setImage(GIF.url)
      return message.channel.send(embed);
    }

    console.log(taggedUser)
    const GIF = await neko.sfw.tickle();
    const embed = new Discord.MessageEmbed()
    .setColor(COLOR)
    .setTitle(`${message.author.username} tickled ${taggedUser.username}`)
    .setImage(GIF.url)
    message.channel.send(embed);
  }
};
