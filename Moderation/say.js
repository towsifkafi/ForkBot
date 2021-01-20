const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR } = require('../config.json')
module.exports = {
  name: "say",
  aliases: ["say"],
  description: "Say as bot...",
  execute(message) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor(COLOR).setDescription(text))
    }
    if (!message.member.permissions.has("MANAGE_GUILD"))
     return invalid(`Sorry you dont have permisson to use that command.`);
    let MSG = message.content.split(`${PREFIX}say `).join("");
    if (MSG == `${PREFIX}say`)
     return invalid(`You did not specify your message to send!`);
    message.channel.send(MSG);
    message.delete();
  }
};
