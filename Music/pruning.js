const { MessageEmbed } = require("discord.js")
const fs = require("fs");
let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
  name: "pruning",
  description: "Toggle pruning of bot messages",
  execute(message) {
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor(config.COLOR).setDescription(text))
    }
    if (!config) return;
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return invalid("There was an error writing to the file.").catch(console.error);
      }

      return invalid(`Message pruning is ${config.PRUNING ? "**enabled**" : "**disabled**"}`)
    });
  }
};
