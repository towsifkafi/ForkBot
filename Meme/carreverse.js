const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR } = require("../config.json");
module.exports = {
  name: "carreverse",
  aliases: ["carreverse"],
  description: "Reverse DA KAR.",
  execute(message) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor('#00FFFF').setDescription(text))
    }
    let uuid = message.content.split(`${PREFIX}carreverse `).join("");
    if (message.content === `${PREFIX}carreverse`) {
      return invalid(`Usage \`${PREFIX}carreverse <text>\``)
    };
    let uuid2 = uuid.replace(/ /g, '%20');
    let helpEmbed = new MessageEmbed()
    .setTitle("Change My Mind")
    .setDescription(uuid)
    .setImage("https://vacefron.nl/api/carreverse?text=" + uuid2)
    .setColor(COLOR);
    helpEmbed.setTimestamp();
    message.channel.send(helpEmbed).catch(console.error);
  }
};
