const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR } = require('../config.json')
const moment = require('moment')
module.exports = {
  name: "serverinfo",
  aliases: ["serverinfo"],
  description: "Say as bot...",
  execute(message) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor(COLOR).setDescription(text))
    }
    const member = message.guild.members.cache;
    const embed2 = new MessageEmbed()
		.setAuthor(`${message.guild.name}'s Info`, message.guild.iconURL())
		.setColor(COLOR)
		.setThumbnail(message.guild.iconURL())
		.addField('Server Name', `\`${message.guild.name}\``, true)
		.addField('Server Owner', `\`${message.guild.owner.user.tag}\``, true)
		.addField('Server ID', `\`${message.guild.id}\``, true)
		.addField('Created', `\`${moment(message.guild.createdAt).format('MMMM Do YYYY')}\``, true)
		.addField('Region', `\`${message.guild.region}\``, true)
		.addField('Verification', `\`${message.guild.verificationLevel}\``, true)
		.addField('Members', `\`${(member.filter(m => m.presence.status === 'online').size)} online, ${(member.filter(m => m.presence.status === 'idle').size)} idle and ${(member.filter(m => m.presence.status === 'dnd').size)} DnD \n${member.filter(m => m.user.bot).size} bots, ${member.filter(m => !m.user.bot).size} humans\``, true)
		.addField('Features', `\`${(message.guild.features.length == 0) ? 'None' : message.guild.features.toString().toLowerCase().replace(/,/g, ', ')}\``, true)
		.addField('Roles', message.guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(', '))
		.setTimestamp()
		.setFooter(`${message.author.tag}`);
	message.channel.send(embed2);
  }
};
