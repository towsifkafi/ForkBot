const {
  MessageEmbed
} = require("discord.js");
const fs = require('fs');
const {
  COLOR
} = require('../config.json')
const schema = require('../schema/nsfw-status')
module.exports = {
  name: "nsfw",
  aliases: ["nsfw"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    let PREFIX = await message.client.prefix(message)

    if (args[0] == 'enable') {
      if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You do not have permissions to use this command');
      const cmd = 'disable'
      schema.findOne({
        Guild: message.guild.id
      }, async (err, data) => {
        if (err) throw err;
        if (data) {
          if (data.Status.includes(cmd)) {
            let commandNumber;

            for (let i = 0; i < data.Status.length; i++) {
              if (data.Status[i] === cmd) data.Status.splice(i, 1)
            }

            await data.save()
            message.channel.send(`Enabled NSFW!`)
          } else return message.channel.send('NSFW isn\'t turned off.')
        }
      })
    } else if (args[0] == 'disable') {
      if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You do not have permissions to use this command');
      const cmd = 'disable'
      schema.findOne({
        Guild: message.guild.id
      }, async (err, data) => {
        if (err) throw err;
        if (data) {
          if (data.Status.includes(cmd)) return message.channel.send('NSFW has already been disabled.');
          data.Status.push(cmd)
        } else {
          data = new schema({
            Guild: message.guild.id,
            Status: cmd
          })
        }
        await data.save();
        message.channel.send(`NSFW has been disabled`)
      })
    } else {
      const check = await schema.findOne({
        Guild: message.guild.id
      })
      if (check) {
        if (check.Status.includes('disable')) return message.channel.send('NSFW is disabled in this server.')
      }
      let adultEmbed = new MessageEmbed()
        .setTitle('🔞 NSFW')
        .setDescription('NSFW Commands')
        .setColor(COLOR)
        .addField('💄 Anime', `\`${PREFIX}anal\`, \`${PREFIX}blowjob\`, \`${PREFIX}boobs\`, \`${PREFIX}cumart\`, \`${PREFIX}cumsluts\`, \`${PREFIX}feet\`, \`${PREFIX}feetgif\`, \`${PREFIX}hentaigif\`, \`${PREFIX}kuni\`, \`${PREFIX}lesbian\`, \`${PREFIX}neko\`, \`${PREFIX}nekogif\`, \`${PREFIX}pussy\`, \`${PREFIX}spank\`, \`${PREFIX}tits\`, \`${PREFIX}trap\`, \`${PREFIX}yuri\`, \`${PREFIX}4k\``)
        .addField('💋 Other', `\`${PREFIX}pgif\`, \`${PREFIX}thigh\``)
      adultEmbed.setTimestamp()
      message.channel.send(adultEmbed)
    }

  }
};