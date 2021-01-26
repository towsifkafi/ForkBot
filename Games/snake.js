const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const SnakeGame = require('./snakeModule.js');
const fs = require('fs');
module.exports = {
  name: "snake",
  aliases: ["snake"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    const snakeGame = new SnakeGame();
    snakeGame.newGame(message);
  }

};
