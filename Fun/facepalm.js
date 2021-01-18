const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const { COLOR } = require('../config.json')
module.exports = {
  name: "facepalm",
  aliases: ["facepalm"],
  description: "Free Hugs >w<.",
  async execute(message) {
    let commands = message.client.commands.array();
    let taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size) {
      const GIFRAW = await fetch('https://some-random-api.ml/animu/face-palm')
      const GIF = await GIFRAW.json()
      const embed = new Discord.MessageEmbed()
      .setColor(COLOR)
      .setTitle(`${message.author.username} facepalmed themselves`)
      .setImage(GIF.link)
      return message.channel.send(embed);
    }

    console.log(taggedUser)
    const GIFRAW = await fetch('https://some-random-api.ml/animu/face-palm')
    const GIF = await GIFRAW.json()
    const embed = new Discord.MessageEmbed()
    .setColor(COLOR)
    .setTitle(`${message.author.username} facepalmed ${taggedUser.username}`)
    .setImage(GIF.link)
    message.channel.send(embed);
  }
};
