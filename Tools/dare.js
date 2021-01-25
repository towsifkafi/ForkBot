const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
let dares = require('../data/TorD/dares.json')

const fs = require('fs');
module.exports = {
  name: "dare",
  aliases: ["dare"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    let m = message.guild.member(message.mentions.users.first() || message.author);
    //let randomPer = message.guild.members.cache.random().user;
    let embed = new MessageEmbed()
      .setTitle('🗡 Dare')
      .setDescription(`${m}, ${dares[Math.floor(Math.random() *dares.length)]}`)
      .setColor(COLOR)
      .setTimestamp()
    message.channel.send(embed)
  }

};
