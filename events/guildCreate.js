const client = require('../index')

const { PREFIX, STATUS, COLOR, DEBUG, TWITCH, MOBILE_MODE } = require("../util/EvobotUtil");
const chalk = require('chalk')

client.on("guildCreate", guild => {
    console.log(chalk.cyan('[Server] ') + chalk.keyword('lightgreen')("+ [" + guild.name + "]"));
    
  })