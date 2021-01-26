const { MessageEmbed } = require("discord.js");
const { TOKEN, PREFIX, COLOR, OWNERS } = require('../config.json')
const { Client } = require('discord.js')
const chalk = require('chalk')
let client = new Client()
const fs = require('fs');
module.exports = {
  name: "dm",
  aliases: ["dm"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    if(!OWNERS.includes(message.author.id)) {
      return message.channel.send('You don\'t have permission to use that command')
    }
    let taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size) {
      return message.channel.send('Please specify users to send message')
    }
    const user = await client.users.fetch(taggedUser.id).catch(() => null);
  if (!user) return message.channel.send("User not found:(");
  let text = message.content.replace(`${PREFIX}dm `, '').replace(`<@!${taggedUser.id}> `, '')
  if(text == `<@!${taggedUser.id}>`) {
    return message.channel.send('Type some message to send')
  }
  await user.send(text).catch((error) => {
    return message.channel.send("User has DMs closed or has no mutual servers with the bot:(");
    console.log(error)
  }).then(() =>{

  let embed = new MessageEmbed()
    .setTitle('👩‍🔧 DM')
    .setDescription(`**Message:** ${text}`)
    .setColor(COLOR)
    .addField('To', taggedUser.username)
  message.channel.send(embed)
  })
  }

};


client.login(TOKEN).then(() =>{
  console.log(chalk.cyan('[DM] ') + 'Started!')
})