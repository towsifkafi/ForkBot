const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { COLOR } = require("../config.json")
module.exports = {
  name: "ping",
  aliases: ["ping"],
  description: "Shows bots ping...",
  cooldown: 10,
  execute(message) {
    let commands = message.client.commands.array();
    let taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size) {

      return message.channel.send('Pinging...').then(m =>{
        var ping = m.createdTimestamp - message.createdTimestamp;
        let embed = new MessageEmbed()
        .setTitle('🏓 Pong!')
        .setColor(COLOR)
        .addField('Latency', `${ping}ms`, true)
        .addField('API Latency', `${Math.round(message.client.ws.ping)}ms`, true)
        m.edit(embed)
      })
    }

    console.log(taggedUser)
    let fact = new MessageEmbed()
    .setTitle(`${taggedUser.username} Pinged!`)
    .setColor(COLOR)
    //${taggedUser.username}
    .setTimestamp()
    message.channel.send(fact)
    message.delete()
  }
};
