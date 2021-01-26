const exec = require("child_process").exec;
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const fs = require('fs');
module.exports = {
  name: "exec",
  aliases: ["exec"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    if (!OWNERS.includes(message.author.id)) return message.channel.send('You don\'t have permission to use that command')
    exec(`${args.join(" ")}`, (error, stdout) => {
      const response = (error || stdout);
      message.channel.send(`Ran: ${message.content}\n\`\`\`${response}\`\`\``, {split: true}).catch(console.error);
    });
  
  }
  
};

