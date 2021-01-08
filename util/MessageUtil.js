const { Message, MessageEmbed } = require("discord.js");

exports.error = (message) => {
    message.channel.send(new MessageEmbed().setTitle('Test'))
    return true;
  };
