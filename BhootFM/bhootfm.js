////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/MilratoUtil");
const { play } = require("../include/play");
const { attentionembed } = require("../util/attentionembed"); 
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const { PREFIX, COLOR } = require(`../config.json`);
const ytdl = require("ytdl-core")
//all radio stations
const years = {
  2018: "BhootFM 2018",
  2019: "BhootFM 2019"
}
const bhootfm2019 = require('./2019.json')
const bhootfm2018 = require('./2018.json')
const months = require("./month.json")
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "bhootfm",
  description: "Play a Radiostation",
  cooldown: 3,
  edesc: `Type this command to play a radio live stream!\nUsage: ${PREFIX}radio <1-34>`,
 async execute(message, args, client) {
   let bhootfmembed = new MessageEmbed()
   .setTimestamp()
   .setTitle('💀 BhootFM')
   .setDescription('Play BhootFM recording in Discord :)) | The Night Comes Alive With BhootFM (not Grameenphone)\n\nClick this [Link](https://bhootfm.towsifkafi.cf) for BhootFM Record archives for download.')
   .setColor(COLOR)
   .addField('\n📆 Recorded', `\n**2019** : Usage \`${PREFIX}bhootfm 2019\`\n**2018** : Usage \`${PREFIX}bhootfm 2018\`\n More Coming Soon!`, true)
   .addField('⌛ Usage', `\`${PREFIX}bhootfm {YEAR}\``, true)

  if(!message.guild)       
        return message.channel.send(bhootfmembed)
    //if no args
    if (args[0] == null) {
        return message.channel.send(bhootfmembed)
    }
  const { channel } = message.member.voice;
  //get the serverQueue
  const serverQueue = message.client.queue.get(message.guild.id);
  //if not a valid channel
  if (!channel) return attentionembed(message, "Please join a Voice Channel first");  
  //react with emoji
    message.react("✅");
    //If not in the same channel return error
    if (serverQueue && channel !== message.guild.me.voice.channel)
    return attentionembed(message, `You must be in the same Voice Channel as me`);
    //check permissions
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return attentionembed(message,"I need permissions to join your channel!");
    if (!permissions.has("SPEAK"))
      return attentionembed(message,"I need permissions to speak in your channel");

//song infos
if (years[args[0]]) {
let month = months.id[Math.floor(Math.random()*months.id.length)]
episodeMonth = null
if (args[0] == '2019') {
  episodeMonth = bhootfm2019.month[month]
}
if (args[0] == '2018') {
  episodeMonth = bhootfm2018.month[month]
}
let episode = episodeMonth[Math.floor(Math.random()*episodeMonth.length)]
const song = {
  title: `BhootFM (${month.toUpperCase()} ${args[0]})`,
  url: episode,
  thumbnail: "https://cdn.discordapp.com/attachments/748095614017077318/769672148524335114/unknown.png",
  duration: 10000,
};
let a, b;
if(!serverQueue){
  a=[];
  b=0;
}else{
  a = serverQueue.filters;
  b = serverQueue.realseek;
}
//change volume to 25
const queueConstruct = {
  textChannel: message.channel,
  channel,
  connection: null,
  songs: [],
  loop: false,
  volume: 25,
  filters: a,
  realseek: b,
  playing: true
};
//try to join the Channel
queueConstruct.connection = await channel.join().catch(console.error);
//Send info message for joining 
if(!serverQueue)
// message.channel.send(    new MessageEmbed().setColor(COLOR)
// .setDescription(`**👍 Joined \`${channel.name}\` 📄 bouned \`#${message.channel.name}\`**`)
// .setFooter(`${message.author.username}#${message.author.discriminator}`));
//send Search something embed
message.channel.send(new MessageEmbed().setColor(COLOR)
.setDescription(`**Playing 🎵 \`BhootFM (${args[0]})\`**`));
//mute yourself
await queueConstruct.connection.voice.setSelfDeaf(true);
await queueConstruct.connection.voice.setDeaf(true);
/*
//if something is playing then end everthing
if (serverQueue) 
  serverQueue.songs = [];
*/
//if something is playing add send this message
if (serverQueue) {
  let i = 99
  //Calculate the estimated Time
  let estimatedtime = Number(0);
  for (let i = 0; i < serverQueue.songs.length; i++) {
    estimatedtime += Number(serverQueue.songs[i].duration);
  }
  if (estimatedtime > 60) {
    estimatedtime = Math.round(estimatedtime / 60 * 100) / 100;
    estimatedtime = estimatedtime + " Minutes"
  }
  else if (estimatedtime > 60) {
    estimatedtime = Math.round(estimatedtime / 60 * 100) / 100;
    estimatedtime = estimatedtime + " Hours"
  }
  else {
    estimatedtime = estimatedtime + " Seconds"
  }
  //Push the ServerQueue
  serverQueue.songs.push(song);
  //the new song embed
  const newsong = new MessageEmbed()
    .setTitle("✅ " + song.title)
    .setColor(COLOR)
    .setThumbnail(song.thumbnail)
    .setDescription(`\`\`\`Has been added to the Queue.\`\`\``)
    .addField("Estimated time until playing:", `\`${estimatedtime}\``, true)
    .addField("Position in queue", `**\`${serverQueue.songs.length - 1}\`**`, true)
    .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
  //send the Embed into the Queue Channel
    return serverQueue.textChannel
    .send(newsong)
    .catch(console.error);
  
}
//add it to the Queue
queueConstruct.songs.push(song);
//set the Server Queue
message.client.queue.set(message.guild.id, queueConstruct);

try {
  play(queueConstruct.songs[0], message, client);     
} catch (error) {
  console.error(error);
  message.client.queue.delete(message.guild.id);
  await channel.leave();
  return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
}
 } else {
   message.channel.send(new MessageEmbed().setColor(COLOR).setDescription('That year is not recorded yet'))
 }
}
};

