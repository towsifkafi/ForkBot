const { MessageEmbed, MessageAttachment } = require("discord.js");
const Discord = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const os = require("os")
const fs = require('fs');
module.exports = {
  name: "status",
  aliases: ["status"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    let memUsage = (process.memoryUsage().rss/1024/1024).toFixed(3);
    let freeMem = (os.freemem()/1024/1024/1024).toFixed(3);
    let thetotalMem = (os.totalmem()/1024/1024/1024).toFixed(3);
    let theOsType = os.type;
    let cpuCores = os.cpus().length;
    let cpuModel = os.cpus()[0].model;
    let Theuptime = Math.floor(os.uptime()/60/60/24);
    let SUptimeHrs = Math.floor((os.uptime()/60/60) % 24);


    let botembed = new Discord.MessageEmbed()

    .setTitle(`ForkBot Stats`)
    .setDescription("ForkBot's Status... 👀")
    .setColor(COLOR)
    .addField("Host Type", `\`${theOsType}\``, true)
    .addField("CPU Cores", `\`${cpuCores}\``, true)
    .addField("CPU Model", `\`${cpuModel}\``, true)
    .addField("Memory Usage", `\`${memUsage} MB\``, true)
    .addField("Free Memory", `\`${freeMem} GB\` / \`${thetotalMem} GB\``, true)
    .addField("System Uptime", `\`${Theuptime} days, ${SUptimeHrs} hours\``, true)
    .setFooter("Bot Developed by Team Infinity Developers | Towsif Kafi")
    .setTimestamp()

    message.channel.send(botembed)
  }

};
