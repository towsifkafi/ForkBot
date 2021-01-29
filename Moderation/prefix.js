const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const prefixSchema = require('../schema/custom-prefix.js')
const { confirmation } = require('@reconlx/discord.js')
const fs = require('fs');

module.exports = {
    name: "prefix",
    aliases: [],
    description: "The Cool command description...",
    async execute(message, args) {
        let commands = message.client.commands.array();
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You do not have permissions to use this command');
        if(args[0] == 'reset') {
            message.channel.send("Are you sure you want to reset the prefix?").then(async (msg) => {
                const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
                if(emoji === '✅') {
                    msg.delete()
                    await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                    message.channel.send(`The prefix has been reset to \`${PREFIX}\``)
                }
                if(emoji === '❌') {
                    msg.delete()
                    message.channel.send('reset prefix has been cancelled.')
                }
            })
        } else {
            const res = await args.join(" ")
            if(!res) return message.channel.send('Please specify a prefix to change to.')
            prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
                if(err) throw err;
                if(data) {
                    prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                    data = new prefixSchema({
                        Guild : message.guild.id,
                        Prefix : res
                    })
                    data.save()
                    message.channel.send(`Your prefix has been updated to **${res}**`)
                } else {
                    data = new prefixSchema({
                        Guild : message.guild.id,
                        Prefix : res
                    })
                    data.save()
                    message.channel.send(`Custom prefix in this server is now set to **${res}**`)
                }
            })
        }
    }
}