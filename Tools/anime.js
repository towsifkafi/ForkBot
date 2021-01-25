const { MessageEmbed, MessageAttachment } = require("discord.js");
const Discord = require("discord.js");
const Scraper = require('mal-scraper')
const { PREFIX, COLOR, OWNERS } = require('../config.json')

const fs = require('fs');
module.exports = {
  name: "anime",
  aliases: ["anime"],
  description: "Shows your or others avatar...",
  async execute(message, args) {
    let commands = message.client.commands.array();
    let Text = args.join(" ");

        if (!Text) return message.channel.send(`Please Give Something!`);
        if (Text.length > 200) return message.channel.send(`Text Limit - 200`);
        let Msg = await message.channel.send(`**Searching It For You 🔎**`);
        let Replaced = Text.replace(/ /g, " ")
        //await Msg.delete();
        let Anime;     
        let Embed;    
        try {  
          Anime = await Scraper.getInfoFromName(Replaced);    
          if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";    
          Embed = new Discord.MessageEmbed()
            .setColor(COLOR)
            .setURL(Anime.url)
            .setTitle(Anime.title)
            .setDescription(Anime.synopsis)
            .addField(`Type`, Anime.type, true)
            .addField(`Status`, Anime.status, true)
            .addField(`Premiered`, Anime.premiered, true)
            .addField(`Episodes`, Anime.episodes, true)
            .addField(`Duration`, Anime.duration, true)
            .addField(`Popularity`, Anime.popularity, true)
            .addField(`Gneres`, Anime.genres.join(", "))
            .setThumbnail(Anime.picture)
            .setFooter(`Score - ${Anime.score}`)
            .setTimestamp(); 
        } catch (error) {
            console.log(error)
            return message.channel.send(`No Anime Found!`)     
        };
      
        return await Msg.edit('**Found 🎈**', Embed);
  }

};
