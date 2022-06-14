const mineflayer = require("mineflayer");

const { QuickDB } = require("quick.db");
const db = new QuickDB();

/**
 * @param {mineflayer.Bot} bot
 */

module.exports = (bot) => {
  bot.on("whisper", (username, message) => {
    if (message.startsWith("!kit")) {
      bot.chat(`/tpa ${username}`);

      bot.on("forcedMove", () => {
        bot.chat("/kill");
      });

      db.set(username, true);
      setTimeout(() => {
        db.delete(username);
        return bot.chat(`/msg ${username} I have removed the cooldown. You can use the kit command again.`);
      }, 3.6e6);
    }
  });
};
