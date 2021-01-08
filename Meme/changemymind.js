const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR } = require("../config.json");
module.exports = {
  name: "changemymind",
  aliases: ["changemymind"],
  description: "Chnage mah mind :/",
  execute(message) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor('#00FFFF').setDescription(text))
    }
    let uuid = message.content.split(`${PREFIX}changemymind `).join("");
    if (message.content === `${PREFIX}changemymind`) {
      return invalid(`Usage \`${PREFIX}changemymind <text>\``)
    };
    if (!uuid)
     return invalid(`You did not specify any username or uuid!`);
    let uuid2 = uuid.replace(/ /g, '%20');
    let helpEmbed = new MessageEmbed()
    .setTitle("Change My Mind")
    .setDescription(uuid)
    .setImage("https://vacefron.nl/api/changemymind?text=" + uuid2)
    .setColor(COLOR);
    helpEmbed.setTimestamp();
    message.channel.send(helpEmbed).catch(console.error);
  }
};
