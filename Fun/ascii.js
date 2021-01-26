const { MessageEmbed, MessageAttachment } = require("discord.js");
const Discord = require("discord.js");
var figlet = require('figlet');
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "ascii",
  aliases: ["ascii"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    msg = args.join(" ");

    figlet.text(`${msg}`, {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true

  }, 

  function(err, data) {

      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }


      const Embed = new Discord.MessageEmbed()
      .setDescription(`\`\`\`${data}\`\`\``);

      message.channel.send(Embed);

  if (Embed.description.length >= 2048)
  return message.channel.send("Your text is too long! Please shorten it.").catch(console.error);

  });

  }

};
