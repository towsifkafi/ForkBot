const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const color = fs.readFileSync('data/amongus/crewmatecolor.json');
const colors = JSON.parse(color);
let lean = [true, false]
module.exports = {
  name: "eject",
  aliases: ["eject"],
  description: "You are kinda sus",
  execute(message) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor('#00FFFF').setDescription(text))
    }
    let taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size) {
      return invalid('You need to mention someone to use this command!')
    }

    let namee = taggedUser.username.replace(/ /g, '%20')
    let fact = new MessageEmbed()
    .setTitle(`${taggedUser.username} Ejected!`)
    .setColor('#00FFFF')
    //${taggedUser.username}
    .setImage(`https://vacefron.nl/api/ejected?name=${namee}&impostor=${lean[Math.floor(Math.random()*lean.length)]}&crewmate=${colors.id[Math.floor(Math.random()*colors.id.length)]}`)
    .setTimestamp()
    message.channel.send(fact)
  }
};
