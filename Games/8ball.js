const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const answers = [
  "Maybe.", "Certainly not.", "I hope so.", "Not in your wildest dreams.",
  "There is a good chance.", "Quite likely.", "I think so.",
  "I hope not.", "I hope so.", "Never!", "Fuhgeddaboudit.",
  "Ahaha! Really?!?", "Pfft.", "Sorry, bucko.",
  "Hell, yes.", "Hell to the no.", "The future is bleak.",
  "The future is uncertain.", "I would rather not say.", "Who cares?",
  "Possibly.", "Never, ever, ever.", "There is a small chance.", "Yes!"];

const fs = require('fs');
module.exports = {
  name: "8ball",
  aliases: ["8ball"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    if(!args[0]) return message.channel.send('Type some text owo')
    message.channel.send(`${answers[Math.floor(Math.random() * answers.length)]}`);
  }

};
