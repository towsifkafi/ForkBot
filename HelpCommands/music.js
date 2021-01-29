const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { COLOR } = require('../config.json')
module.exports = {
  name: "music",
  aliases: ["music"],
  description: "Shows your or others avatar...",
  async execute(message) {
    let commands = message.client.commands.array();
    let PREFIX = await message.client.prefix(message)
    let musicEmbed = new MessageEmbed()
      .setTitle(`🎶 Music`)
      .setDescription("Music commands")
      .setColor(COLOR)
      .addField('🎵 Commands', `\`${PREFIX}play\`, \`${PREFIX}stop\`, \`${PREFIX}pasue\`, \`${PREFIX}resume\`, \`${PREFIX}skin\`, \`${PREFIX}skipto\`, \`${PREFIX}volume\`, \`${PREFIX}search\`, \`${PREFIX}loop\`, \`${PREFIX}lyrics\`, \`${PREFIX}move\`, \`${PREFIX}np\`, \`${PREFIX}queue\`, \`${PREFIX}pruning\``, true)
      .addField('📎 Other', `\`${PREFIX}clip\`, \`${PREFIX}clips\``)
    musicEmbed.setTimestamp();
    fs.readdir("./sounds/meme", function(err, files) {
      if (err) return console.log("Unable to read directory: " + err);

      let clips = [];

      files.forEach(function(file) {
        clips.push(file.substring(0, file.length - 4));
      });
      musicEmbed.addField('🎵 Clips', `\`${clips.join("`, `")}\``)
      message.channel.send(musicEmbed)
    })
    
  }
};
