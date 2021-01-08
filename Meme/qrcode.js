const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR } = require("../config.json");
module.exports = {
  name: "qrcode",
  aliases: ["qrcode"],
  description: "Reverse DA KAR.",
  execute(message) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor('#00FFFF').setDescription(text))
    }
    let uuid = message.content.split(`${PREFIX}qrcode `).join("");
    if (message.content === `${PREFIX}qrcode`) {
      return invalid(`Usage \`${PREFIX}qrcode <text>\``)
    };
    let uuid2 = uuid.replace(/ /g, '%20');
    let helpEmbed = new MessageEmbed()
    .setTitle("Change My Mind")
    .setDescription(uuid)
    .setImage("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + uuid2)
    .setColor(COLOR);
    helpEmbed.setTimestamp();
    message.channel.send(helpEmbed).catch(console.error);
  }
};
