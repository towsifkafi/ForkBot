const { MessageEmbed, MessageAttachment } = require("discord.js");
const Discord = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const canvacord = require("canvacord");

const fs = require('fs');
module.exports = {
  name: "youtube",
  aliases: ["youtube"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let msg = await message.channel.send('Please Wait..')
    let commands = message.client.commands.array();


    const argszero = new Discord.MessageEmbed()
    .setDescription("<:canvadenied:763570128062251008> You need to atleast comment something... right?");

    if(!args[0]) return message.channel.send(argszero)


    let m = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0] || message.author.id));
    if(!m || !m.user || !m.user.displayAvatarURL()) m = message.member;
    let avatar1 = m.user.displayAvatarURL({dynamic: false, format: "png", size: 256});

     msg = args.join(" ").replace(message.mentions.users.first(), '');

    let image = await canvacord.Canvas.youtube( {username: message.author.username, content: `${msg}`, avatar: avatar1, dark: false } );
    let attachment = new Discord.MessageAttachment(image, 'youtube.png');


    let embed = new MessageEmbed().attachFiles(attachment).setImage('attachment://youtube.png').setColor(COLOR)
    //message.channel.send(attachment);
    message.channel.send('Done!', embed);
    msg.delete()
  }

};
