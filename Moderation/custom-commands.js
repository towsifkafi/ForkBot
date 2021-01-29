const {
    MessageEmbed,
    MessageAttachment
} = require("discord.js");
const {
    PREFIX,
    COLOR,
    OWNERS
} = require('../config.json')
const schema = require('../schema/custom-commands')

const fs = require('fs');

module.exports = {
    name: "customcommand",
    aliases: ["customcmd", "cc"],
    description: "The Cool command description...",
    async execute(message, args) {
        let commands = message.client.commands.array();
        if (args[0] == 'create') {
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command');

            const name = args[1];
            const response = args.slice(2).join(" ");

            if (!name) return message.channel.send('Please specify a command name');
            if (!response) return message.channel.send('Please specify a response');
            //if (commands.includes(name)) return message.client.invalid(message, `You can\'t use \`${name}\` command. It will override a built in bot command.`)
            const data = await schema.findOne({
                Guild: message.guild.id,
                Command: name
            });
            if (data) return message.channel.send('This custom commands exists already!');
            const newData = new schema({
                Guild: message.guild.id,
                Command: name,
                Response: response
            })
            await newData.save();
            message.channel.send(`Saved **${name}** as a custom command!`);
        } else if (args[0] == 'delete') {
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command');

            const name = args[1];

            if (!name) return message.channel.send('Please specify a command name');

            const data = await schema.findOne({
                Guild: message.guild.id,
                Command: name
            });
            if (!data) return message.channel.send('That custom command does not exist!');
            await schema.findOneAndDelete({
                Guild: message.guild.id,
                Command: name
            });
            message.channel.send(`Removed **${name}** from custom commands!`);
        } else if (args[0] == 'list') {
            const data = await schema.find({
                Guild: message.guild.id
            });
            if (!!data === false) return message.channel.send('There is no custom commands!');
            let ccmds = data.map((cmd, i) =>
                `${i + 1}: ${cmd.Command}`
            ).join('\n')
            if (ccmds == '') {
                return message.channel.send(
                    new MessageEmbed()
                    .setColor('BLUE')
                    .setDescription('There are no custom commands in this server.')
                )
            }
            message.channel.send(
                new MessageEmbed()
                .setColor('BLUE')
                .setDescription(ccmds)
            )
        } else {
            message.client.invalid(message, 'Invalid.')
        }

    }
}