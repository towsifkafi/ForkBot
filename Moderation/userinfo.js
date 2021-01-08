const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR } = require('../config.json')
const moment = require('moment')
const emojiList = {
	'online': '🟢',
	'offline': '⚫',
	'idle': '🟡',
	'dnd': '🔴',
};
module.exports = {
  name: "userinfo",
  aliases: ["userinfo"],
  description: "Say as bot...",
  execute(message) {
    let commands = message.client.commands.array();
    function invalid(text) {
		message.channel.send(new MessageEmbed().setColor('#00FFFF').setDescription(text))
	  }
	  taggedUser = message.mentions.users.first();
	  if (!message.mentions.users.size) {
		taggedUser = message.author
	  }
	console.log(taggedUser)
    const embed = new MessageEmbed()
		.setAuthor(`${emojiList[taggedUser.presence.status]} ${taggedUser.tag}`, taggedUser.displayAvatarURL())
		.setColor(3447003)
		.setThumbnail(taggedUser.displayAvatarURL({ format: 'png', size: 512 }))
		.addField('ID', `\`${taggedUser.id}\``, true)
		.addField('Status', `\`${(taggedUser.presence.activities.length >= 1) ? `${taggedUser.presence.activities[0].name} - ${(taggedUser.presence.activities[0].type == 'CUSTOM_STATUS') ? taggedUser.presence.activities[0].state : taggedUser.presence.activities[0].details}` : 'None'}\``, true)
		//.addField('Roles', taggedUser.roles.cache.map(roles => roles).join(', '), true)
		.addField('Last Activity', `${moment(taggedUser.joinedAt).format('lll')} `)
		.addField('Registered', `${moment(taggedUser.createdAt).format('lll')} \`${moment(taggedUser.createdAt).fromNow()} (${Math.round((new Date() - taggedUser.createdAt) / 86400000)} day(s) ago)\``)
		//.addField('Permissions', taggedUser.permissions.toArray().toString().toLowerCase().replace(/_/g, ' ').replace(/,/g, ' » '))
		.setTimestamp()
		.setFooter(message.author.tag);
	message.channel.send(embed);
  }
};
