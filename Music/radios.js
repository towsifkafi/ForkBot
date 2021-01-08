const { MessageEmbed, Message } = require("discord.js");
const fs = require("fs");
const { PREFIX, COLOR } = require("../config.json")
module.exports = {
  name: "radios",
  aliases: ["radios"],
  description: "Display all commands and descriptions",
  async execute(message) {
    let commands = message.client.commands.array();
    const Radiostations = require('./radios.json')
    let list1 = new MessageEmbed()
            .setTitle(`**✅ Radio Stations**`)//
            .addField('🎵 Lofi-Beats Radio', `
            **1:  ** [\`${Radiostations[1-1].split(" ")[0]}\`]()
            **2:  ** [\`${Radiostations[2-1].split(" ")[0]}\`]()
            **3:  ** [\`${Radiostations[3-1].split(" ")[0]}\`]()
            **4:  ** [\`${Radiostations[4-1].split(" ")[0]}\`]()
            **5:  ** [\`${Radiostations[5-1].split(" ")[0]}\`]()
            `)		
            .setColor(COLOR)
            .setFooter(`Type: ${PREFIX}radio <1-34>`)
        list1.setTimestamp();
    let list2 = new MessageEmbed()
            .setTitle(`**✅ Radio Stations**`)//
            .addField('🎵 Nightcore Radio', `
            **6:  ** [\`${Radiostations[6-1].split(" ")[0]}\`]()
            **7:  ** [\`${Radiostations[7-1].split(" ")[0]}\`]()
            **8:  ** [\`${Radiostations[8-1].split(" ")[0]}\`]()
            **9:  ** [\`${Radiostations[9-1].split(" ")[0]}\`]()
            **10:  ** [\`${Radiostations[10-1].split(" ")[0]}\`]()
        `)
            .setColor(COLOR)
            .setFooter(`Type: ${PREFIX}radio <1-34>`)
        list2.setTimestamp();
    let list3 = new MessageEmbed()
        .setTitle(`**✅ Radio Stations**`)//
        .addField('🇧🇩 Bangladeshi Radio', `
        **11:  ** [\`${Radiostations[11-1].split(" ")[0]}\`]()
        **12:  ** [\`${Radiostations[12-1].split(" ")[0]}\`]()
        **13:  ** [\`${Radiostations[13-1].split(" ")[0]}\`]()
        **14:  ** [\`${Radiostations[14-1].split(" ")[0]}\`]()
        **15:  ** [\`${Radiostations[15-1].split(" ")[0]}\`]()
    `)
        .setColor(COLOR)
        .setFooter(`Type: ${PREFIX}radio <1-34>`)
    list3.setTimestamp();


    const msg = await message.channel.send(list1);
    await msg.react('1️⃣')
    await msg.react('2️⃣')
    await msg.react('🇧🇩')
    var collector = msg.createReactionCollector((reaction, user) => user.id == message.author.id && { time:60000})
      collector.on("collect",async (reaction, user) => {
      switch (reaction.emoji.name) {
        case "1️⃣":
          reaction.users.remove(user).catch(console.error);
          msg.edit(list1)
          break;
        case "2️⃣":
          reaction.users.remove(user).catch(console.error);
          msg.edit(list2)
          break; 
        case "🇧🇩":
          reaction.users.remove(user).catch(console.error);
          msg.edit(list3)
          msg.react('⏩')
          break; 
        case "⏩":
          reaction.users.remove(user).catch(console.error);
          msg.edit(list2)
          break; 
      }

    })
  }
};
