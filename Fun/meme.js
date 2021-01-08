const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch')
const Discord = require('discord.js');
const fs = require('fs');
const { COLOR } = require('../config.json')
module.exports = {
  name: "meme",
  aliases: ["meme"],
  description: "Memmees...",
  async execute(message) {
    let commands = message.client.commands.array();
	  const res = await fetch(encodeURI(`https://meme-api.herokuapp.com/gimme`));
    const json = await res.json();
    console.log(res)
      const embed = new Discord.MessageEmbed()
      .setColor(COLOR)
      .setTitle(`${json.title}`)
      .setImage(json.url)
      .setFooter(`👍 ${json.ups} | ${json.author}`)
      return message.channel.send(embed);
  }
};
