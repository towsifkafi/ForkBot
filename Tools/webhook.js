const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const fs = require('fs');
module.exports = {
  name: "webhook",
  aliases: ["wh"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    let taggedUser = message.mentions.users.first();
    if (!message.member.permissions.has("MANAGE_GUILD"))
     return invalid(`Sorry you dont have permisson to use that command.`);
    if (!message.mentions.users.size) {
      return message.channel.send(`Usage ${PREFIX}webhook <url> <mention> <text>`)
    }
    try {
		const webhooks = await message.channel.fetchWebhooks();
		const webhook = webhooks.first();

		await webhook.send(args.toString().replace(/,/g, ' ').slice(args[0].length), {
			username: taggedUser.username,
			avatarURL: taggedUser.displayAvatarURL()
        });
        message.delete();
	} catch (error) {
		message.channel.send('Error trying to send Or No Webhooks were found in this channel! ');
	}



  }

};
