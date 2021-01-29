const { MessageEmbed, MessageAttachment } = require("discord.js");
const { PREFIX, COLOR, OWNERS } = require('../config.json')
const { ReactionPages }  = require('reconlx');
const fs = require('fs');

module.exports = {
    name: "members",
    aliases: [],
    description: "The Cool command description...",
    cooldown: 5,
    async execute(message, args) {
        let commands = message.client.commands.array();
        const members = message.guild.members.cache
            .filter((m) => !m.user.bot)
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);

        const arrayOfMembers = members.array();
        const ids = [];
        arrayOfMembers.forEach((mem) => {
            ids.push(mem.user.id);
        })

        let index = 1;
        if(ids.length > 10) {
            const chunks = convertChunk(ids, 10);
            const arry = [];
            for (chunk of chunks) {
                const description = chunk.map((v) => `#${index++} **${message.guild.members.cache.get(v).user.tag}**`);
                arry.push(
                    new MessageEmbed()
                        .setTitle('Join Leaderboard in ' + message.guild.name)
                        .setDescription(description)
                        .setColor(COLOR)
                        .setFooter('You can also type page number in chat')
                )
            }
            ReactionPages(message, arry, true)
        } else {
            const description = ids.map((v) => `#${index++} **${message.guild.members.cache.get(v).user.tag}**`);
            message.channel.send(
                new MessageEmbed()
                 .setTitle('Join Leaderboard in ' + message.guild.name)
                 .setDescription(description)
                 .setColor(COLOR)
                 .setFooter('You can also type page number in chat')
            )
        }
    }
}

function convertChunk(arr, size) {
    const array = [];
    for (let i = 0; i < arr.length; i+= size) {
        array.push(arr.slice(i, i+size))
    }
    return array;
}