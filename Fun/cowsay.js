const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "cowsay",
  aliases: ["cowsay"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    const input = args;
    const cow = "        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||\n"
    message.channel.send("```\n." + '_'.repeat(input.length + 2) + "\n< " + input + " >\n " + '-'.repeat(input.length + 2) + "\n" + cow + "```");
    
  }

};
