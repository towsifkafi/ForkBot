const { MessageEmbed } = require("discord.js");
const { COLOR } = require('../config.json')
module.exports = {
  name: "invite",
  description: "Send bot invite link",
  execute(message) {
    let invite = new MessageEmbed()
    .setTitle('📩 Invite') // <:emoji_name:id>
    .setColor(COLOR)
    .setDescription('Hello There! Looks like you want to invite this bot to your cool server uwu.')
    .addField('Invite', `Click [Here](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot) to invite this bot to your server`)
    .addField('🎐 Servers', `${message.client.guilds.cache.size}`, true)
    .addField('🧑 Members', `${message.client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}`, true)
    return message.channel.send(invite);
  }
};
