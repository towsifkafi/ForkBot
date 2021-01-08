const { MessageEmbed } = require("discord.js");
const { PREFIX, COLOR } = require("../config.json");
const fetch = require('node-fetch')
module.exports = {
  name: "pokemon",
  aliases: ["pokemon"],
  description: "Reverse DA KAR.",
  async execute(message) {
    let commands = message.client.commands.array();
    function invalid(text) {
      message.channel.send(new MessageEmbed().setColor('#00FFFF').setDescription(text))
    }
    let uuid = message.content.split(`${PREFIX}pokemon `).join("");
    if (message.content === `${PREFIX}pokemon`) {
      return invalid(`Usage \`${PREFIX}pokemon <text>\``)
    };
    let uuid2 = uuid.replace(/ /g, '%20');
    let url = await fetch(encodeURI(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${uuid2}`))
    console.log(url)
    if (url.statusText == 'Invalid Request') {
      return invalid('Can\'t find that pokemon.')
    }
    const res = await url.json();
    let embed = new MessageEmbed()
		  .setAuthor(res.name, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.typeIcon}`)
		  .setDescription(`Type of this pokemon is **${res.info.type}**. ${res.info.description}`)
		  .setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.photo}`)
      .setFooter(`Weakness of pokemon - ${res.info.weakness}`, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.weaknessIcon}`)
      .setColor(COLOR)
	  message.channel.send(embed);
  }
};
