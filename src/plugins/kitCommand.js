const mineflayer = require("mineflayer");

const { QuickDB } = require("quick.db");
const db = new QuickDB();

/**
 * @param {mineflayer.Bot} bot
 */

module.exports = (bot) => {
  bot.on("whisper", async (username, message) => {
    if (message.startsWith("!kit")) {
      const user = await db.has(`user_${username}`, true);
      if (user) {
        return bot.chat(`/msg ${username} You are on cooldown. Please wait 1 hour before using this command again.`);
      }

      bot.chat(`/tpa ${username}`);

      bot.on("forcedMove", () => {
        bot.chat("/kill");
      });

      db.set(`user_${username}`, true);
      setTimeout(() => {
        db.delete(`user_${username}`);
        return bot.chat(`/msg ${username} I have removed the cooldown. You can use the kit command again.`);
      }, 3.6e6);
    }
  });
};
