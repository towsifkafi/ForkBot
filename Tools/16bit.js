const { MessageEmbed, MessageAttachment } = require("discord.js");
const Discord = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const canvacord = require("canvacord");

const fs = require('fs');
module.exports = {
  name: "16bit",
  aliases: ["16bit"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let msg = await message.channel.send('Please Wait..')
    let commands = message.client.commands.array();


    let m = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0] || message.author.id));
    if(!m || !m.user || !m.user.displayAvatarURL()) m = message.member;
    let avatar = m.user.displayAvatarURL({dynamic: false, format: "png", size: 256});

    let image = await canvacord.Canvas.pixelate(avatar, 16);
    let attachment = new Discord.MessageAttachment(image, 'sixteenbit.png');


    let embed = new MessageEmbed().attachFiles(attachment).setImage('attachment://sixteenbit.png').setColor(COLOR)
    //message.channel.send(attachment);
    message.channel.send('Done!', embed);
    msg.delete()
  }

};
