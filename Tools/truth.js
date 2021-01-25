const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
let truths = require('../data/TorD/truths.json')

const fs = require('fs');
module.exports = {
  name: "truth",
  aliases: ["truth"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    let m = message.guild.member(message.mentions.users.first() || message.author);
    //let randomPer = message.guild.members.cache.random().user;
    let embed = new MessageEmbed()
      .setTitle('🗡 Truth')
      .setDescription(`${m}, ${truths[Math.floor(Math.random() *truths.length)]}`)
      .setColor(COLOR)
      .setTimestamp()
    message.channel.send(embed)
  }

};
