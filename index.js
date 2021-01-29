/**
 * Module Imports
 */
const { Client, Collection, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const mongo = require("./Others/mongo.js");
const customcommands = require("./schema/custom-commands.js");
const customprefix = require('./schema/custom-prefix.js')
const commandmanager = require('./schema/command-status')
const { TOKEN, PREFIX, STATUS, COLOR, DEBUG, TWITCH, MOBILE_MODE } = require("./util/EvobotUtil");
const chalk = require('chalk')
console.log(chalk.hex('#6bff93')('[ForkBot] Starting ForkBot'))

const client = new Client({ disableMentions: "everyone" });
module.exports = client;
client.login(TOKEN);
client.commands = new Collection();
client.categories = new Collection();

client.prefix = async function(message) {
  let custom;

  const data = await customprefix.findOne({ Guild : message.guild.id })
      .catch(err => console.log(err))
  
  if(data) {
      custom = data.Prefix;
  } else {
      custom = PREFIX;
  }
  return custom;
}
 
eventFiles = readdirSync(join(__dirname, "events")).filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(join(__dirname, "events", `${file}`));
}

client.invalid = async function(message, text) {
  message.channel.send(new MessageEmbed().setDescription(text).setColor(COLOR))
}

client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/**
 * Client Events
 */
client.on("ready", async () => {
  await mongo().then(mongoose =>{
      console.log(chalk.keyword('lightgreen')('[MongoDB] ') + 'Connected To Database')
  })
});



client.on("warn", (info) => console.log(chalk.keyword('orange')('[Warning] ') + info));
client.on("reconnecting", () => console.log(chalk.keyword('orange')('[Warning] ') + 'Reconneting...'));
client.on("error", console.error);

/**
 * Import all commands
 */



commandFiles = readdirSync(join(__dirname, "Music")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "Music", `${file}`));
  client.categories.set(command.name, `Music|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `Others`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Others`, `${file}`));
  client.categories.set(command.name, `Others|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `Fun`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Fun`, `${file}`));
  client.categories.set(command.name, `Fun|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `Meme`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Meme`, `${file}`));
  client.categories.set(command.name, `Meme|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `NSFW`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `NSFW`, `${file}`));
  client.categories.set(command.name, `NSFW|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `Moderation`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Moderation`, `${file}`));
  client.categories.set(command.name, `Moderation|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `HelpCommands`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `HelpCommands`, `${file}`));
  client.categories.set(command.name, `Help|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `BhootFM`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `BhootFM`, `${file}`));
  client.categories.set(command.name, `BhootFM|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `RSS`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `RSS`, `${file}`));
  client.categories.set(command.name, `RSS|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `Games`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Games`, `${file}`));
  client.categories.set(command.name, `Games|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `Tools`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Tools`, `${file}`));
  client.categories.set(command.name, `Tools|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `Owner`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Owner`, `${file}`));
  client.categories.set(command.name, `Owner|${command.name}`)
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `BETA`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `BETA`, `${file}`));
  client.categories.set(command.name, `BETA|${command.name}`)
  client.commands.set(command.name, command);
}


client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if(message.content == '..') return;
  const p = await client.prefix(message)
  if(message.mentions.users.first()) {
    if(message.mentions.users.first().id === '797650426085376051') return message.channel.send(`Prefix in \`${message.guild.name}\` is \`${p}\``)
  }
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(p)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  
  const commandName = args.shift().toLowerCase();

  const data = await customcommands.findOne({ Guild: message.guild.id, Command: commandName });
  if (data) message.channel.send(data.Response)
  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if(command) {
    if(client.commands.get(commandName).beta == 'true') return client.invalid(message, 'This command is only for BETA testers')
    const check = await commandmanager.findOne({ Guild: message.guild.id })
    if(check) {
      if(check.Cmds.includes(command.name)) return message.channel.send('This command has been disabled in this server.')
    }
  }
  if (!command) return;
  


  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});




client.on("guildDelete", guild => {
  prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
        prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
    }
  })

})

