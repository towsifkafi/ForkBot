const client = require('../index.js')

const { PREFIX, STATUS, COLOR, DEBUG, TWITCH, MOBILE_MODE } = require("../util/EvobotUtil");
const chalk = require('chalk')

client.on("debug", function (info) {
  if(DEBUG === true) {
  console.log(chalk.keyword('lightgreen')('[Debug] ') + `${info}`);
  }
});