const ytdl = require("erit-ytdl");
const { MessageEmbed } = require('discord.js');
const scdl = require("soundcloud-downloader").default;
const { canModifyQueue, STAY_TIME, COLOR } = require("../util/EvobotUtil");
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
module.exports = {
  async play(song, message, client, filters) {
    const { SOUNDCLOUD_CLIENT_ID } = require("../util/EvobotUtil");

    let config;

    try {
      config = require("../config.json");
    } catch (error) {
      config = null;
    }

    const PRUNING = config ? config.PRUNING : process.env.PRUNING;

    const queue = message.client.queue.get(message.guild.id);

    if (!song) {
      setTimeout(function () {
        if (queue.connection.dispatcher && message.guild.me.voice.channel) return;
        queue.channel.leave();
        queue.textChannel.send(new MessageEmbed().setColor('#00FFFF').setDescription("Leaving voice channel..."));
      }, STAY_TIME * 1000);
      queue.textChannel.send(new MessageEmbed().setColor('#00FFFF').setDescription("❌ Music queue ended.")).catch(console.error);
      return message.client.queue.delete(message.guild.id);
    }

    let stream = null;
    let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
    if (filters === "remove") {
      queue.filters = ['-af','dynaudnorm=f=200'];
      encoderArgstoset = queue.filters;
      try{
        seekTime = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000 + oldSeekTime;
      } catch{
        seekTime = 0;
      } 
        queue.realseek = seekTime;
  } else if (filters)
  {
    try{
      seekTime = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000 + oldSeekTime;
    } catch{
      seekTime = 0;
    } 
      queue.realseek = seekTime;
      queue.filters.push(filters)
      encoderArgstoset = ['-af', queue.filters]
  }
    try {
      if (song.url.includes("youtube.com")) {
        stream = await ytdl(song.url, { highWaterMark: 1 << 25 });
        isnotayoutube = false;
      } else if (song.url.includes("soundcloud.com")) {
        try {
          stream = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, SOUNDCLOUD_CLIENT_ID);
        } catch (error) {
          stream = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, SOUNDCLOUD_CLIENT_ID);
          streamType = "unknown";
        }
      } else if (song.url.includes(".mp3") || song.url.includes("baseradiode")) {
        stream = await song.url;
        isnotayoutube = true;
      }
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      console.error(error);
      return message.channel.send(`Error: ${error.message ? error.message : error}`);
    }

    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
    
    if(isnotayoutube){
      console.log("TEST")
      const dispatcher = queue.connection
      .play(stream)
      .on("finish", () => {
        if (collector && !collector.ended) collector.stop();
  
        if (queue.loop) {
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
    })
    .on("error", (err) => {
      console.error(err);
      queue.songs.shift();
      module.exports.play(queue.songs[0], message);
    });
  dispatcher.setVolumeLogarithmic(queue.volume / 100);
  } else {

    const dispatcher = queue.connection
      .play(stream, { type: streamType })
      .on("finish", () => {
        if (collector && !collector.ended) collector.stop();

        if (queue.loop) {
          // if loop is on, push the song back at the end of the queue
          // so it can repeat endlessly
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], message);
        } else {
          // Recursively play the next song
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 100);
  }
    try {
      //`🎶 Started playing: **${song.title}** ${song.url}`
      var playingMessage = await queue.textChannel.send(new MessageEmbed().setColor(COLOR).setTitle('🎶 Started playing').addField('Song', `[${song.title}](${song.url})`, true).addField('Duration', moment.duration(song.duration, "second").format(),true));
      await playingMessage.react("⏭");
      await playingMessage.react("⏯");
      await playingMessage.react("🔇");
      await playingMessage.react("🔉");
      await playingMessage.react("🔊");
      await playingMessage.react("🔁");
      await playingMessage.react("⏹");
    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000
    });

    collector.on("collect", (reaction, user) => {
      if (!queue) return;
      const member = message.guild.member(user);

      switch (reaction.emoji.name) {
        case "⏭":
          queue.playing = true;
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.connection.dispatcher.end();
          //`${user} ⏩ skipped the song`
          queue.textChannel.send(new MessageEmbed().setTitle('⏩ Skip').setColor(COLOR).setDescription(`${user} skipped the song`)).catch(console.error);
          collector.stop();
          break;

        case "⏯":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.playing) {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.pause(true);
            //`${user} ⏸ paused the music.`
            queue.textChannel.send(new MessageEmbed().setTitle('⏸ Pause').setColor(COLOR).setDescription(`${user} paused the music.`)).catch(console.error);
          } else {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.resume();
            //`${user} ▶ resumed the music!`
            queue.textChannel.send(new MessageEmbed().setTitle('▶ Resume').setColor(COLOR).setDescription(`${user} resumed the music!`)).catch(console.error);
          }
          break;

        case "🔇":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.volume <= 0) {
            queue.volume = 100;
            queue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
            //`${user} 🔊 unmuted the music!`
            queue.textChannel.send(new MessageEmbed().setTitle('🔊 Unmute').setColor(COLOR).setDescription(`${user} unmuted the music!`)).catch(console.error);
          } else {
            queue.volume = 0;
            queue.connection.dispatcher.setVolumeLogarithmic(0);
            //`${user} 🔇 muted the music!`
            queue.textChannel.send(new MessageEmbed().setTitle('🔇 Mute').setColor(COLOR).setDescription(`${user} muted the music!`)).catch(console.error);
          }
          break;

        case "🔉":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member) || queue.volume == 0) return;
          if (queue.volume - 10 <= 0) queue.volume = 0;
          else queue.volume = queue.volume - 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          queue.textChannel
          //`${user} 🔉 decreased the volume, the volume is now ${queue.volume}%`
            .send(new MessageEmbed().setTitle('🔉 Volume').setColor(COLOR).setDescription(`${user} decreased the volume`).addField('Current Volume', queue.volume))
            .catch(console.error);
          break;

        case "🔊":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member) || queue.volume == 100) return;
          if (queue.volume + 10 >= 100) queue.volume = 100;
          else queue.volume = queue.volume + 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          queue.textChannel
          //`${user} 🔊 increased the volume, the volume is now ${queue.volume}%`
            .send(new MessageEmbed().setTitle('🔉 Volume').setColor(COLOR).setDescription(`${user} increased the volume`).addField('Current Volume', queue.volume))
            .catch(console.error);
          break;

        case "🔁":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.loop = !queue.loop; //`Loop is now ${queue.loop ? "**on**" : "**off**"}`
          queue.textChannel.send(new MessageEmbed().setTitle('🔁 Loop').setColor(COLOR).addField('Enabled', queue.loop ? "**True**" : "**False**")).catch(console.error);
          break;

        case "⏹":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.songs = [];
          //`${user} ⏹ stopped the music!`
          queue.textChannel.send(new MessageEmbed().setTitle('⏹ Stop').setColor(COLOR).setDescription(`${user} stopped the music!`)).catch(console.error);
          try {
            queue.connection.dispatcher.end();
          } catch (error) {
            console.error(error);
            queue.connection.disconnect();
          }
          collector.stop();
          break;

        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });

    collector.on("end", () => {
      playingMessage.reactions.removeAll().catch(console.error);
      if (PRUNING && playingMessage && !playingMessage.deleted) {
        playingMessage.delete({ timeout: 3000 }).catch(console.error);
      }
    });
  }
};
