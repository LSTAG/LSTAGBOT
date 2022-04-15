const mineflayer = require("mineflayer");
const colors = require("colors");

/**
 * @param {mineflayer.Bot} bot
 */

module.exports = (bot) => {
  bot.on("chat", (username, message) => {
    console.log(`[${new Date().toLocaleTimeString().gray}] [${username.yellow}] ${message.green}`);
  });
};
