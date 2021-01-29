const {
    MessageEmbed,
    MessageAttachment
} = require("discord.js");
const {
    PREFIX,
    COLOR,
    OWNERS
} = require('../config.json')
const schema = require('../schema/command-status')
const fs = require('fs');

module.exports = {
    name: "cmd",
    aliases: ['command', 'commands'],
    description: "The Cool command description...",
    async execute(message, args) {
        let commands = message.client.commands.array();
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You need administrator permissions to use this command')
        if (args[0] == 'enable') {
            const cmd = args[1];
            if (!cmd) return message.channel.send('Please specify a command')
            if (!!message.client.commands.get(cmd) === false) return message.channel.send('This command does not exist');
            schema.findOne({
                Guild: message.guild.id
            }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    if (data.Cmds.includes(cmd)) {
                        let commandNumber;

                        for (let i = 0; i < data.Cmds.length; i++) {
                            if (data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                        }

                        await data.save()
                        message.channel.send(`Enabled \`${cmd}\`!`)
                    } else return message.channel.send('That command isn\'t turned off.')
                }
            })
        } else if (args[0] == 'disable') {
            const cmd = args[1];
            if (!cmd) return message.channel.send('Please specify a command')
            if (!!message.client.commands.get(cmd) === false) return message.channel.send('This command does not exist');
            schema.findOne({
                Guild: message.guild.id
            }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    if (data.Cmds.includes(cmd)) return message.channel.send('This command has already been disabled.');
                    data.Cmds.push(cmd)
                } else {
                    data = new schema({
                        Guild: message.guild.id,
                        Cmds: cmd
                    })
                }
                await data.save();
                message.channel.send(`Command \`${cmd}\` has been disabled`)
            })
        }

    }
}