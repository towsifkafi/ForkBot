const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const fs = require('fs');
const { invalid } = require("moment");
const nekoclient = require('nekos.life');
const nsfw = require('../schema/nsfw-status')

const neko = new nekoclient();
const { COLOR } = require('../config.json')
module.exports = {
  name: "cumsluts",
  aliases: ["cumsluts"],
  description: "NSFW",
  async execute(message) {
    const check = await nsfw.findOne({
      Guild: message.guild.id
    })
    if (check) {
      if (check.Status.includes('disable')) return message.channel.send('NSFW is disabled in this server.')
    }
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor('#00FFFF').setDescription(text))
    }
    if (!message.channel.nsfw) return invalid('Umm....This is not a NSFW channel..Sorry!')
    const GIF = await neko.nsfw.cumsluts();
      const embed = new Discord.MessageEmbed()
      .setColor(COLOR)
      .setTitle(`NSFW | CumSluts`)
      .setImage(GIF.url)
      return message.channel.send(embed);
  }
};
