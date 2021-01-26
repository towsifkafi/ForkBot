const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "truthordare",
  aliases: ["tod"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    let m = message.guild.member(message.mentions.users.random() || message.author);
    //let randomPer = message.guild.members.cache.random().user;
    let msg = await message.channel.send('https://media.discordapp.net/attachments/797442530534096917/802826979530899486/main-qimg-e5c6bc0d02e870e0efd948231ad7a3b2.gif')
    let embed = new MessageEmbed()
      .setTitle('🗡 Truth Or Dare')
      .setDescription(`${m}, What do you choose? Truth or Dare\n\n\`..truth\` or \`..dare\``)
      .setColor(COLOR)
      .setTimestamp()
    //message.channel.send(embed)
    setTimeout(() => {
      msg.edit('Truth or Dare', embed)
    }, 2000);
  }

};
