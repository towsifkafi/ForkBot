const { MessageEmbed, MessageAttachment } = require("discord.js");
const { fetchTranscript } = require('reconlx')
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "transcript",
  aliases: ["transcript"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
    fetchTranscript(message, 99)
    .then(data => {
        const file = new MessageAttachment(data, 'index.html');
        message.channel.send('Transcript of last 100 Messages', file)
    })
  }

};
