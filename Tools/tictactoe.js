const { MessageEmbed, MessageAttachment } = require("discord.js");
const { tictactoe } = require('reconlx')
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "tictactoe",
  aliases: ["tictactoe"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    var game = new tictactoe({
      message: message,
      player_two : message.mentions.members.first()
    })
  }

};
