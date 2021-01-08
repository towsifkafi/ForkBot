const { MessageEmbed } = require("discord.js")
const fs = require("fs");
const { PREFIX, COLOR } = require("../config.json");
module.exports = {
  name: "clips",
  description: "List all clips",
  execute(message) {
    fs.readdir("./sounds/meme", function(err, files) {
      if (err) return console.log("Unable to read directory: " + err);

      let clips = [];

      files.forEach(function(file) {
        clips.push(file.substring(0, file.length - 4));
      });

      let embed = new MessageEmbed()
        .setTitle('Clips')
        .setColor(COLOR)
        .setDescription(`Play them via \`${PREFIX}clip <name>\``)
        .addField('All Clips', `\`${clips.join("`, `")}\``)
      message.channel.send(embed);
    });
  }
};
