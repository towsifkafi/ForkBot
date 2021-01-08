const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR } = require('../config.json')
const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
  name: "owofy",
  aliases: ["owofy"],
  description: "Displays available commands...",
  async execute(message) {
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor('#00FFFF').setDescription(text))
    }
    let commands = message.client.commands.array();
    let MSG = message.content.split(`${PREFIX}owofy `).join("");
    if (MSG == `${PREFIX}owofy`) {
     return invalid('You did not specify your message to owofy!');
    }
    const owoTEXT = await neko.sfw.OwOify({text: message.content.split(' ').slice(1).join(' ')})
    message.channel.send(owoTEXT.owo);
  }
};
