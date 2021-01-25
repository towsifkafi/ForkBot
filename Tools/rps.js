const { MessageEmbed, MessageAttachment } = require("discord.js");
const { tictactoe } = require('reconlx')
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const choices = ["rock", "paper", "scissors"];

const fs = require('fs');
module.exports = {
  name: "rockpaperscissor",
  aliases: ["rps"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    if(!args[0]) return message.channel.send('Usage \`rock\`. \`paper\` or \`scissors\`.')
    if (!args[0].match(/Rock|Paper|Scissors/i)) return message.reply(`Wrong move \`rock\`. \`paper\` or \`scissors\`.`);
        const outcome = choices[Math.floor(Math.random() * choices.length)];
        const choice = args[0].toLowerCase();
        if (choice === "rock") {
            if (outcome === "rock") return message.reply("***Rock! That's a tie!***");
            if (outcome === "paper") return message.reply("***Paper! I win, you lose!***");
            if (outcome === "scissors") return message.reply("***Scissors! No! You won...***");
        }
        if (choice === "paper") {
            if (outcome === "rock") return message.reply("***Rock! No! You won...***");
            if (outcome === "paper") return message.reply("***Paper! Yeah! That's a tie!***");
            if (outcome === "scissors") return message.reply("***Scissors! I win, you lose!***");
        }
        if (choice === "scissors") {
            if (outcome === "rock") return message.reply("***Rock! I win, you lose!***");
            if (outcome === "paper") return message.reply("***Paper! No! You won...***");
            if (outcome === "scissors") return message.reply("***Scissors! Yeah! That's a tie!***");
        }
  }

};
