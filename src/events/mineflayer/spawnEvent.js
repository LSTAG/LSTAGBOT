const mineflayer = require("mineflayer");
const colors = require("colors");

/**
 * @param {mineflayer.Bot} bot
 */

module.exports = (bot) => {
  bot.once("spawn", async () => {
    console.log(
      `[${new Date().toLocaleTimeString().gray}] [${bot.username.yellow}] ${`Spawned`.green}`
    );
  });
};
