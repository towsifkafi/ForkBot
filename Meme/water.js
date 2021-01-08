const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR } = require("../config.json");
module.exports = {
  name: "water",
  aliases: ["water"],
  description: "splash...",
  execute(message) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor(COLOR).setDescription(text))
    }
    let uuid = message.content.split(`${PREFIX}water `).join("");
    if (message.content === `${PREFIX}water`) {
      return invalid(`Usage \`${PREFIX}water <text>\``)
    };
    if (!uuid)
     return invalid(`You did not specify any username or uuid!`);
    let uuid2 = uuid.replace(/ /g, '%20');
    let helpEmbed = new MessageEmbed()
    .setTitle("Change My Mind")
    .setDescription(uuid)
    .setImage("https://vacefron.nl/api/water?text=" + uuid2)
    .setColor(COLOR);
    helpEmbed.setTimestamp();
    message.channel.send(helpEmbed).catch(console.error);
  }
};
