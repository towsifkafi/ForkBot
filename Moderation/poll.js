const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "poll",
  aliases: ["poll"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have permission to use this command');
    if(!args[0]) {
      return message.channel.send('._. wot.. wheres the text?')
    }

    let msg = args.join(' ')
    let embed = new MessageEmbed()
      .setTitle('📝 Poll')
      .addField('Message || Yes or No ?', msg)
      .setColor(COLOR)
      .setTimestamp()
    let mesg = await message.channel.send(embed)
    mesg.react('👍')
    mesg.react('👎')
  }

};
