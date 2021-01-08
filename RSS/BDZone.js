const Discord = require('discord.js');
const client = new Discord.Client();
let Parser = require('rss-parser');
const { TOKEN, PREFIX, COLOR } = require('../config.json')
let parser = new Parser();

async function something() {
    //console.log("[RSS] Loading feed");
    feed = await parser.parseURL('https://bdzone.info/forums/-/index.rss')
	//console.log("[RSS] Feed Loaded [1min]")
	//console.log(feed)
	}


client.on('ready', async () => {
	feed = await parser.parseURL('https://bdzone.info/forums/-/index.rss')
	//console.log(feed.items[0]['content:encodedSnippet'])
	//console.log('RSS Cached [1min]')
	//console.log(`Logged in as ${client.user.tag}!`);
	setInterval(function(){
	something()
	}, 60000);
});

client.on('message', message => {
  if (message.content === `${PREFIX}rss bdzone`) {
    (async () => {
  		let content = feed.items[0]['content:encodedSnippet'].replace(/ &#8230;/g, '...')
  		const embed = new Discord.MessageEmbed()
  		.setColor(COLOR)
  		.setAuthor('BDZone.Info | Feed', 'https://bdzone.info/file/logo.png', 'https://bdzone.info/')
  		.setTitle(feed.items[0].title)
  		.setURL(feed.items[0].link)
  		.setDescription(`Author: ${feed.items[0].creator}\nDate: ${feed.items[0].pubDate}\n\n` + content + ` [More](${feed.items[0].link})`)
  		.setTimestamp()
  		message.channel.send(embed)

	})();
  }
  if (message.content === `${PREFIX}rss reload`) {
    (async () => {
    	message.channel.send('Reloading feed!')
    	console.log('[Discord] Reloading Feed!')
    	feed = await parser.parseURL('https://bhooture.com/feed/')
    	console.log('[Discord] Feed Reloaded!')
  		let content = feed.items[0]['content:encodedSnippet'].replace(/ &#8230;/g, '...')
  		const embed = new Discord.MessageEmbed()
  		.setColor(COLOR)
  		.setTitle('🧨 Reload')
  		.setDescription(`Feed Reloaded!`)
  		.setTimestamp()
  		message.channel.send(embed)

	})();
  }
});




client.login(TOKEN);