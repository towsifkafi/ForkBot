const { MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch')
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "wiki",
  aliases: ["wiki"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    const body = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`,
    ).then(res => res.json().catch(() => {}));
  
  if (!body) return message.channel.sendmessage.channel.send({embed: {
                color: COLOR,
                title: "❌ Error Page Not Found."
            }})
    if (body.title && body.title === "Not found.") return message.channel.send({embed: {
                color: COLOR,
                title: "❌ Error Page Not Found."
            }});

  const embed = new MessageEmbed()
      .setTitle(`🌐 ${body.title} `)
  .addField("More Info: ",`**[Click Here!](${body.content_urls.desktop.page})**`, true)
      .setDescription(`** ${body.extract}**`)
      .setColor(COLOR)
  .setTimestamp()
  
   if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
  message.channel.send(embed);
  }

};
