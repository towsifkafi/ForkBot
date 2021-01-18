const { MessageEmbed, MessageAttachment } = require("discord.js");
const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const { COLOR } = require('../config.json')
module.exports = {
  name: "wasted",
  aliases: ["wasted"],
  description: "Free Hugs >w<.",
  async execute(message) {
    let commands = message.client.commands.array();
    let taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size) {
      let attachmnet = new MessageAttachment(`https://some-random-api.ml/canvas/wasted/?avatar=${message.author.avatarURL({ format: 'png'})}`, 'triggered.gif')
      return message.channel.send(attachmnet);
    }

    console.log(taggedUser)
    let attachmnet = new MessageAttachment(`https://some-random-api.ml/canvas/wasted/?avatar=${taggedUser.avatarURL({ format: 'png'})}`, 'triggered.gif')
    message.channel.send(attachmnet);
  }
};
