const { MessageEmbed, Message } = require("discord.js");
const fs = require("fs");
const { readdirSync } = require("fs");
const { join } = require("path");
const { PREFIX, COLOR, OWNERS, BETA } = require("../config.json")
// main = []
// maincmds = []
// let maincommands = readdirSync(join(__dirname, "../Music")).filter((file) => file.endsWith(".js"))
// maincommands.forEach((cmds) =>{
//   main.push(cmds.replace('.js', ''))
// })
// main.forEach((cmds) =>{
//   maincmds.push(`..${cmds}`)
// })
// const musiccmds = `\`${maincmds.join('\`, \`')}\``
// console.log(musiccmds)
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
      .setDescription(`List of all commands. You can also use \`${PREFIX}allcommands\` to list all commands. \`${commands.length}\` commands loaded.`)
      .setColor(COLOR)
      .addField('🍴 ForkBot', 'What is fork bot you ask? hehe.. ForkBot is a bot made from popular discord.js projects on Github. Also check this bot\'s repository `..github`')
      .addField('‼ Moderation', `Use \`${PREFIX}moderation\` to list moderation commands`, true)
      .addField('🎶 Music', `Use \`${PREFIX}music\` to list music commands`, true)
      .addField('🤣 Meme Gen', `Use \`${PREFIX}memegen\` for list meme generator commands`, true)
      .addField('🎉 Fun', `Use \`${PREFIX}fun\` to list for commands`, true)
      .addField('🔞 NSFW', `Use \`${PREFIX}nsfw\` to list nsfw commands`, true)
      .addField('🎲 Games', `Use \`${PREFIX}games\` to list game commands`, true)
      .addField('🔧 Tools', `Use \`${PREFIX}tools\` to list tools commands`, true)
      .addField('🧵 Others', `Use \`${PREFIX}others\` to list other commands`, true)
    helpEmbed.setTimestamp();
    
    if(BETA.includes(message.author.id)) {
          helpEmbed.addField('🧪 BETA', `Use \`${PREFIX}beta\` to list BETA Tester commands`, true)
    }
    if(OWNERS.includes(message.author.id)) {
      helpEmbed.addField('🛠 Owner', `Use \`${PREFIX}owner\` to list owner commands`, true)
    }
    

    let modEmbed = new MessageEmbed()
      .setTitle(`‼ Moderation`)
      .setDescription("Moderation commands")
      .setColor(COLOR)
      .addField('Ban/Kick', `\`${PREFIX}ban\`, \`${PREFIX}kick\`, \`${PREFIX}mute\`, \`${PREFIX}unmute\`, \`${PREFIX}purge\`, \`${PREFIX}slowmode\`, \`${PREFIX}announce\`, \`${PREFIX}poll\``, true)
      .addField('Say/Embed', `\`${PREFIX}say\`, \`${PREFIX}serverinfo\`, \`${PREFIX}userinfo\`, \`${PREFIX}roleinfo\`, \`${PREFIX}setnick\`, \`${PREFIX}transcript\`, \`${PREFIX}steal\``)
    modEmbed.setTimestamp();

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
      .addField('🤣 Meme Genenerator', `\`${PREFIX}meme\`, \`${PREFIX}carreverse\`, \`${PREFIX}changemymind\`, \`${PREFIX}eject\`, \`${PREFIX}meeting\`, \`${PREFIX}water\`, \`${PREFIX}8bit\`, \`${PREFIX}16bit\`, \`${PREFIX}32bit\`, \`${PREFIX}beautify\`, \`${PREFIX}bed\`, \`${PREFIX}blur\`, \`${PREFIX}rip\`, \`${PREFIX}trigger\`, \`${PREFIX}wanted\`, \`${PREFIX}youtube\``)
    memeEmbed.setTimestamp()

    let funEmbed = new MessageEmbed()
      .setTitle(`🎉 Fun`)
      .setDescription('Fun Commands')
      .setColor(COLOR)
      .addField('🎈Gif', `\`${PREFIX}poke\`, \`${PREFIX}slap\`, \`${PREFIX}smug\`, \`${PREFIX}wink\`, \`${PREFIX}tickle\`, \`${PREFIX}pat\`, \`${PREFIX}hug\`, \`${PREFIX}feed\`, \`${PREFIX}cuddle\`, \`${PREFIX}wasted\`, \`${PREFIX}triggered\`, \`${PREFIX}glass\`, \`${PREFIX}gay\`, \`${PREFIX}facepalm\``)
      .addField('✨ Other', `\`${PREFIX}owofy\`, \`${PREFIX}pokemon\`, \`${PREFIX}baka\`, \`${PREFIX}ascii\`, \`${PREFIX}cowsay\`, \`${PREFIX}emojify\`, \`${PREFIX}insult\`, \`${PREFIX}iq\`, \`${PREFIX}shrug\``)
    funEmbed.setTimestamp()

    let adultEmbed = new MessageEmbed()
      .setTitle('🔞 NSFW')
      .setDescription('NSFW Commands')
      .setColor(COLOR)
      .addField('💄 Anime', `\`${PREFIX}anal\`, \`${PREFIX}blowjob\`, \`${PREFIX}boobs\`, \`${PREFIX}cumart\`, \`${PREFIX}cumsluts\`, \`${PREFIX}feet\`, \`${PREFIX}feetgif\`, \`${PREFIX}hentaigif\`, \`${PREFIX}kuni\`, \`${PREFIX}lesbian\`, \`${PREFIX}neko\`, \`${PREFIX}nekogif\`, \`${PREFIX}pussy\`, \`${PREFIX}spank\`, \`${PREFIX}tits\`, \`${PREFIX}trap\`, \`${PREFIX}yuri\`, \`${PREFIX}4k\``)
      .addField('💋 Other', `\`${PREFIX}pgif\`, \`${PREFIX}thigh\``)
    adultEmbed.setTimestamp()

    let gamesEmbed = new MessageEmbed()
      .setTitle('🎲 Games')
      .setDescription('Games Commands')
      .setColor(COLOR)
      .addField('🎲 Commands', `\`${PREFIX}8ball\`, \`${PREFIX}rps\`, \`${PREFIX}tictactoe\`, \`${PREFIX}truthordare (${PREFIX}tod)\`, \`${PREFIX}snake\``)
    gamesEmbed.setTimestamp()

    let toolsEmbed = new MessageEmbed()
      .setTitle('🔧 Tools')
      .setDescription('Tools Commands')
      .setColor(COLOR)
      .addField('🔧 Commands', `\`${PREFIX}anime\`, \`${PREFIX}djs\`, \`${PREFIX}npm\`, \`${PREFIX}shortlink\`, \`${PREFIX}urban\`, \`${PREFIX}weather\`, \`${PREFIX}webhook\`, \`${PREFIX}wiki\`, \`${PREFIX}yt\``)
    toolsEmbed.setTimestamp()

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
    await msg.react('‼')
    await msg.react('🎶')
    await msg.react('🤣')
    await msg.react('🎉')
    await msg.react('🔞')
    await msg.react('🎲')
    await msg.react('🔧')
    await msg.react('🧵')
    await msg.react('📃')
    var collector = msg.createReactionCollector((reaction, user) => user.id == message.author.id && { time:60000})
      collector.on("collect", (reaction, user) => {
      switch (reaction.emoji.name) {
        case "📃":
          reaction.users.remove(user).catch(console.error);
          msg.edit(helpEmbed)
          break;
        case "‼":
          reaction.users.remove(user).catch(console.error);
          msg.edit(modEmbed)
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
        case "🎲":
          reaction.users.remove(user).catch(console.error);
          msg.edit(gamesEmbed)
          break;
        case "🔧":
          reaction.users.remove(user).catch(console.error);
          msg.edit(toolsEmbed)
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