const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR } = require("../config.json");
module.exports = {
  name: "meeting",
  aliases: ["meeting"],
  description: "Emergency Meeting!",
  execute(message) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor(COLOR).setDescription(text))
    }
    let uuid = message.content.split(`${PREFIX}meeting `).join("");
    if (message.content === `${PREFIX}meeting`) {
      return invalid(`Usage \`${PREFIX}meeting <text>\``)
    };
    let uuid2 = uuid.replace(/ /g, '%20');
    let helpEmbed = new MessageEmbed()
    .setTitle("Emrgency Meeting!")
    .setDescription(uuid)
    .setImage("https://vacefron.nl/api/emergencymeeting?text=" + uuid2)
    .setColor(COLOR);
    helpEmbed.setTimestamp();
    message.channel.send(helpEmbed).catch(console.error);
  }
};
