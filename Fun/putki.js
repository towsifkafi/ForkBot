const Canvas = require('canvas');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const { COLOR } = require('../config.json')
module.exports = {
  name: "putki",
  aliases: ["putki"],
  description: "Free Hugs >w<.",
  async execute(message) {
    let commands = message.client.commands.array();
    if (message.mentions.users.first()) {
        let mentioned = message.mentions.users.first()
        const canvas = Canvas.createCanvas(600, 600);
        const ctx = canvas.getContext('2d');
    
        const background = await Canvas.loadImage('https://cdn.discordapp.com/emojis/801308754129846303.png');
        const avatar = await Canvas.loadImage(mentioned.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 235, 185);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'jail.png');
    
        message.channel.send(new MessageEmbed().attachFiles(attachment).setImage('attachment://jail.png').setColor(COLOR).setTitle(`You Putki, ${mentioned.username}!`));
    }
    if (!message.mentions.users.first()) {
        const canvas = Canvas.createCanvas(600, 600);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('https://cdn.discordapp.com/emojis/801308754129846303.png');
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 235, 185);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'jail.png');
    
        message.channel.send(new MessageEmbed().attachFiles(attachment).setImage('attachment://jail.png').setColor(COLOR).setTitle(`You Putkified yourself`));
    }
  }
};




