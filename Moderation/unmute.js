const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const fs = require('fs');
module.exports = {
  name: "unmute",
  aliases: ["unmute"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} is now unmuted`)
  }

};
