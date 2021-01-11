const { MessageEmbed, Message } = require("discord.js");
const fs = require("fs");
const { PREFIX, COLOR } = require("../config.json")
module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  async execute(message) {
    let commands = message.client.commands.array();
    
    message.react("🎉");
    fs.readdir("./sounds/meme", function(err, files) {
      if (err) return console.log("Unable to read directory: " + err);

      let clips = [];

      files.forEach(function(file) {
        clips.push(file.substring(0, file.length - 4));
      });
      musicEmbed.addField('🎵 Clips', `\`${clips.join("`, `")}\``)
    })

    let helpEmbed = new MessageEmbed()
      .setTitle(`${message.client.user.username} Help`)
      .setDescription("List of all commands")
      .setColor(COLOR)
      .addField('🎶 Music', `Use \`${PREFIX}music\` to list music commands`, true)
      .addField('🤣 Meme Gen', `Use \`${PREFIX}memegen\` for list meme generator commands`, true)
      .addField('🎉 Fun', `Use \`${PREFIX}fun\` to list for commands`, true)
      .addField('🔞 NSFW', `Use \`${PREFIX}nsfw\` to list nsfw commands`, true)
      .addField('🧵 Others', `Use \`${PREFIX}others\` to list other commands`, true)
    helpEmbed.setTimestamp();

    let musicEmbed = new MessageEmbed()
      .setTitle(`🎶 Music`)
      .setDescription("Music commands")
      .setColor(COLOR)
      .addField('🎵 Commands', `\`${PREFIX}play\`, \`${PREFIX}stop\`, \`${PREFIX}pasue\`, \`${PREFIX}resume\`, \`${PREFIX}skin\`, \`${PREFIX}skipto\`, \`${PREFIX}volume\`, \`${PREFIX}search\`, \`${PREFIX}loop\`, \`${PREFIX}lyrics\`, \`${PREFIX}move\`, \`${PREFIX}np\`, \`${PREFIX}queue\`, \`${PREFIX}pruning\``, true)
      .addField('📎 Other', `\`${PREFIX}clip\`, \`${PREFIX}clips\``)
    musicEmbed.setTimestamp();
    
    let memeEmbed = new MessageEmbed()
      .setTitle('🤣 Meme Gen')
      .setDescription('Meme/Image Generation Commands')
      .setColor(COLOR)
      .addField('📷 Image Generator', `\`${PREFIX}qrcode\``)
      .addField('🤣 Meme Genenerator', `\`${PREFIX}meme\`, \`${PREFIX}carreverse\`, \`${PREFIX}changemymind\`, \`${PREFIX}eject\`, \`${PREFIX}meeting\`, \`${PREFIX}water\``)
    memeEmbed.setTimestamp()

    let funEmbed = new MessageEmbed()
      .setTitle(`🎉 Fun`)
      .setDescription('Fun Commands')
      .setColor(COLOR)
      .addField('🎈Gif', `\`${PREFIX}poke\`, \`${PREFIX}slap\`, \`${PREFIX}smug\`, \`${PREFIX}tickle\`, \`${PREFIX}pat\`, \`${PREFIX}hug\`, \`${PREFIX}feed\`, \`${PREFIX}cuddle\``)
      .addField('✨ Other', `\`${PREFIX}owofy\`, \`${PREFIX}pokemon\`, \`${PREFIX}baka\``)
    funEmbed.setTimestamp()

    let adultEmbed = new MessageEmbed()
      .setTitle('🔞 NSFW')
      .setDescription('NSFW Commands')
      .setColor(COLOR)
      .addField('💄 Anime', `\`${PREFIX}anal\`, \`${PREFIX}blowjob\`, \`${PREFIX}boobs\`, \`${PREFIX}cumart\`, \`${PREFIX}cumsluts\`, \`${PREFIX}feet\`, \`${PREFIX}feetgif\`, \`${PREFIX}hentaigif\`, \`${PREFIX}kuni\`, \`${PREFIX}lesbian\`, \`${PREFIX}neko\`, \`${PREFIX}nekogif\`, \`${PREFIX}pussy\`, \`${PREFIX}spank\`, \`${PREFIX}tits\`, \`${PREFIX}trap\`, \`${PREFIX}yuri\``)
    adultEmbed.setTimestamp()

    let otherEmbed = new MessageEmbed()
      .setTitle(`🧵 Others`)
      .setDescription('Other Commands')
      .setColor(COLOR)
      .addField('🎃 Status', `\`${PREFIX}serverinfo\`, \`${PREFIX}userinfo\`, \`${PREFIX}ping\`, \`${PREFIX}uptime\``)
      .addField('🎐 Other', `\`${PREFIX}say\`, \`${PREFIX}avatar\`, \`${PREFIX}invite\`, \`${PREFIX}support\``)
      .addField('📨 RSS', `\`${PREFIX}rss bdzone\``,true)
      .addField('💀 BhootFM', `\`${PREFIX}bhootfm\``, true)
    otherEmbed.setTimestamp()

    const msg = await message.channel.send(helpEmbed);
    await msg.react('🎶')
    await msg.react('🤣')
    await msg.react('🎉')
    await msg.react('🔞')
    await msg.react('🧵')
    await msg.react('📃')
    var collector = msg.createReactionCollector((reaction, user) => user.id == message.author.id && { time:60000})
      collector.on("collect", (reaction, user) => {
      switch (reaction.emoji.name) {
        case "📃":
          reaction.users.remove(user).catch(console.error);
          msg.edit(helpEmbed)
          break;
        case "🎶":
          reaction.users.remove(user).catch(console.error);
          msg.edit(musicEmbed)
          break;
        case "🤣":
          reaction.users.remove(user).catch(console.error);
          msg.edit(memeEmbed)
          break;
        case "🎉":
          reaction.users.remove(user).catch(console.error);
          msg.edit(funEmbed)
          break;
        case "🔞":
          reaction.users.remove(user).catch(console.error);
          msg.edit(adultEmbed)
          break;
        case "🧵":
          reaction.users.remove(user).catch(console.error);
          msg.edit(otherEmbed)
          break;  
      }

    })
  }
};

    // commands.forEach((cmd) => {
    //   helpEmbed.addField(
    //     `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
    //     `${cmd.description}`,
    //     true
    //   );
    // });