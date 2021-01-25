const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR } = require('../config.json')
module.exports = {
  name: "purge",
  aliases: ["purge", "clear", "clean", "prune", "delete"],
  description: "Say as bot...",
  execute(message, args) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor(COLOR).setDescription(text))
    }
    if (!message.member.permissions.has("MANAGE_GUILD"))
     return invalid(`Sorry you dont have permisson to use that command.`);

    //console.log(args[0])
    if(!args[0]) return invalid(`Please enter the clear amount.. \`${PREFIX}purge <amount>\``)
    if(isNaN(args[0])) return invalid(`\`${args[0]}\` is not a number`)
    message.channel.bulkDelete(args[0]);
    message.channel.send(new MessageEmbed().setColor(COLOR).setDescription(`Cleared \`${args[0]}\` messages`)).then(msg =>{
      setTimeout(() => {
        msg.delete()
      }, 2000);
    })
  }
};
