const collectBlock = require("mineflayer-collectblock").plugin;
const mineflayer = require("mineflayer");
const colors = require("colors");

/**
 * @param {mineflayer.Bot} bot
 */

module.exports = (bot) => {
  // bot.loadPlugin(collectBlock);
  // bot.on("chat", async (username, message) => {
  //   if (message.startsWith("go")) {
  //     let mcData = require("minecraft-data")(bot.version);
  //     if (bot.player.isMoving) {
  //       bot.player.stop();
  //     }
  //     const blockType = mcData.blocksByName[`${args[1]}`];
  //     if (!blockType) {
  //       bot.chat(`No block going by the name ${args[1]}.`);
  //       return;
  //     }
  //     const blocks = bot.findBlocks({
  //       matching: blockType.id,
  //       maxDistance: 255,
  //       count: 20,
  //     });
  //     if (blocks.length === 0) {
  //       bot.chat(`No blocks found.`);
  //     }
  //     const targets = [];
  //     for (let i = 0; i < Math.min(blocks.length, 20); i++) {
  //       targets.push(bot.blockAt(blocks[i]));
  //     }
  //     bot.chat(`Found ${targets.length} blocks.`);
  //     bot.collectBlock.collect(targets, (err) => {
  //       if (err) {
  //         bot.chat(err.message);
  //       } else {
  //         bot.chat(`Collected ${targets.length} blocks.`);
  //       }
  //     });
  //   }
  // });
};
