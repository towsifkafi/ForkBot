const { MessageEmbed, MessageAttachment } = require("discord.js");
const Discord = require("discord.js")
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const superagent = require('superagent');
const nsfw = require('../schema/nsfw-status')

const fs = require('fs');
module.exports = {
  name: "cum",
  aliases: ["cum"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    const check = await nsfw.findOne({
      Guild: message.guild.id
    })
    if (check) {
      if (check.Status.includes('disable')) return message.channel.send('NSFW is disabled in this server.')
    }
    let commands = message.client.commands.array();
        if (!message.channel.nsfw) {
          message.react('💢');
          return message.channel.send({embed: {
                  color: 16734039,
                  description: "You can use this command in an NSFW Channel!"
              }})
      }
      superagent.get('https://nekos.life/api/v2/img/cum')
          .end((err, response) => {
        const embed = new Discord.MessageEmbed()
        .setTitle(":smirk: cum")
        .setImage(response.body.url)
        .setColor(COLOR)
        .setFooter(`Tags: cum`)
        .setURL(response.body.url);
      message.channel.send(embed);
      })
  }

};
