const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "roleinfo",
  aliases: ["roleinfo"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    const role = message.mentions.roles.first();
    if (!role) return message.channel.send('Mention a role to view  role\'s info')
    return message.channel.send(new MessageEmbed()
            .setColor(role.hexColor)
            .setTimestamp(role.createdAt)
            .setFooter("Role Created At")
            .addField("❯ Name", role.name, true)
            .addField("❯ ID", role.id, true)
            .addField("❯ Color", role.hexColor, true)
            .addField("❯ Members", role.members.size, true)
            .addField("❯ Hoisted", role.hoist ? "Yes" : "No", true)
            .addField("❯ Mentionable", role.mentionable ? "Yes" : "No", true)
            .addField(`❯ Permission(s)`, role.permissions.toArray().length ? role.permissions.toArray().join(", ") : "None"));
  }

};
