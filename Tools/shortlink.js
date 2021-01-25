const { MessageEmbed } = require("discord.js");
const chalk = require('chalk')
const request = require('request')
const { PREFIX, COLOR, OWNERS, API } = require('../config.json')
const fetch = require('node-fetch');
const fs = require('fs');
module.exports = {
  name: "shorturl",
  aliases: ["surl"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    if (!args[0]) {
      return message.channel.send(`Usage \`${PREFIX}shortlink <link>\` [Link Should Start With \`https://\` or \`http://\`]`)
    }
    if(!args[0].startsWith('http')) return message.channel.send('Invalid Url Link Should Start With \`https://\` or \`http://\`')
    message.channel.send('Please wait...links are being created').then(async msg =>{
      const BDZONE = await fetch(`https://d.bdzone.info/api?api=${API.LINK_SHORTENER.BDZONE}&url=${args[0]}`)
      const BDZONE_LINK = await BDZONE.json()
      const CUTTLY = await fetch(`https://cutt.ly/api/api.php?key=${API.LINK_SHORTENER.CUTTLY}&short=${args[0]}`)
      const CUTTLY_LINK = await CUTTLY.json()
      const ISGD = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(args[0])}`)
      const ISGD_LINK = await ISGD.json()
      request({ uri: "https://api.rebrandly.com/v1/links", method: "POST", body: JSON.stringify({ destination: args[0] }), headers: { "Content-Type": "application/json", "apikey": API.LINK_SHORTENER.REBRANDLY } }, (err, response, body) => {
            console.log(chalk.keyword('lime')('[Link Shortener] ') + 'https://' + JSON.parse(body).shortUrl)
            console.log(chalk.keyword('lime')('[Link Shortener] ') + BDZONE_LINK.shortenedUrl)
            console.log(chalk.keyword('lime')('[Link Shortener] ') + CUTTLY_LINK.url.shortLink)
            let sendmsg = new MessageEmbed()
            .setTitle('🗜 Link Shortener')
            .setDescription('Discord Link Shortener')
            .setColor(COLOR)
            .addField(`🔗 Shortened Links`, `Link: ${args[0]}\n\n**BDZone**: [Link](${BDZONE_LINK.shortenedUrl}) \`${BDZONE_LINK.shortenedUrl}\`\n**Cuttly**: [Link](${CUTTLY_LINK.url.shortLink}) \`${CUTTLY_LINK.url.shortLink}\`\n**Rebrandly**: [Link](${'https://' + JSON.parse(body).shortUrl}) \`${'https://' + JSON.parse(body).shortUrl}\`\n**Is.gd**: [Link](${'https://' + ISGD_LINK.shorturl}) \`${ISGD_LINK.shorturl}\``)
            msg.edit('Links Created' ,sendmsg)
      })
    })
    



  }

};
