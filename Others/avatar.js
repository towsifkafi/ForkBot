const { MessageEmbed } = require("discord.js");
const fs = require('fs');
module.exports = {
  name: "avatar",
  aliases: ["avatar"],
  description: "Shows your or others avatar...",
  execute(message) {
    let commands = message.client.commands.array();
    let taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size) {
      let fact = new MessageEmbed()
      .setTitle(`${message.author.username}'s Avatar`)
      .setColor('#00FFFF')
      //${taggedUser.username}
      .setImage(message.author.avatarURL())
      .setTimestamp()
      return message.channel.send(fact)
    }

    let fact = new MessageEmbed()
    .setTitle(`${taggedUser.username} Ejected!`)
    .setColor('#00FFFF')
    //${taggedUser.username}
    .setImage(taggedUser.displayAvatarURL())
    .setTimestamp()
    message.channel.send(fact)
  }
};
