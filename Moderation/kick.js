const { MessageEmbed } = require('discord.js')
const { COLOR } = require('../config.json')

module.exports={
    name:'kick',
    description:"lol",
    execute(message, args){
        function invalid(text) {
            message.channel.send(new MessageEmbed().setColor(COLOR).setDescription(text))
        }
        if (!message.member.permissions.has("MANAGE_GUILD"))
         return invalid(`Sorry you dont have permisson to use that command.`);
        const user = message.mentions.users.first();
        if (user) {
        const member = message.guild.member(user);
        if (member) {
            member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
                invalid(`Successfully kicked \`${user.tag}\``);
            })
            .catch(err => {
                invalid('I was unable to kick the member');
                console.error(err);
            });
        } else {
            invalid("That user isn't in this guild!");
        }
        } else {
            invalid("You didn't mention the user to kick!");
        }
    }
}