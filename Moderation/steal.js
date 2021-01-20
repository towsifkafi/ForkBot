const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const { PREFIX, COLOR } = require('../config.json')
module.exports = {
  name: "steal",
  aliases: ["steal"],
  description: "Say as bot...",
  execute(message, args) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor(COLOR).setDescription(text))
    }
    if (!message.member.permissions.has("MANAGE_GUILD"))
     return invalid(`Sorry you dont have permisson to use that command.`);
    const emoji = args[0];
    if (!emoji) return invalid('Nothing a provided')
    let custom = Discord.Util.parseEmoji(emoji);
    if(custom.id == null) {
      return invalid('Invalid Emoji')
    }
    if(args[0]){
         message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`, custom.name)
         //.then(emoji => message.channel.send(`Created new emoji with name ${emoji.name}!`))
         .then(emoji => message.channel.send(new MessageEmbed()
            .setTitle('🎃 Steal')
            .setColor(COLOR)
            .setDescription(`Created new emoji with name \n` + "`" + `${emoji.name}` + "`")
            .setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`)))
    }
  }
};

