const client = require('../index')

const { PREFIX, STATUS, COLOR, DEBUG, TWITCH, MOBILE_MODE } = require("../util/EvobotUtil");
const chalk = require('chalk')

client.on("ready", async () => {
    console.log(chalk.cyan('[Discord] ') + `${client.user.username} ready!`);
    console.log(chalk.cyan('[Discord] ') + `Bot tag: ${client.user.tag}`);
    console.log(chalk.cyan('[Discord] ') + `Guilds: ${client.guilds.cache.size}`);
    if(MOBILE_MODE == false) {
      setInterval(function() {
        let statuses = STATUS[Math.floor(Math.random()*STATUS.length)]
        client.user.setPresence({
          status: 'online',
          activity: {
              name: statuses,
              type: 'STREAMING',
              url: `https://twitch.tv/${TWITCH}`
          }
        })
      }, 10000)
    } else if(MOBILE_MODE == true) {
      setInterval(function() {
        let statuses = STATUS[Math.floor(Math.random()*STATUS.length)]
        client.user.setPresence({
          status: 'online',
          activity: {
              name: statuses
          }
        })
      }, 10000)
    }
  });