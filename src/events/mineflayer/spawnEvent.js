const mineflayer = require("mineflayer");
const colors = require("colors");
const request = require("request");

const { ehookid, ehooktoken, host } = require("../../config.json");

/**
 * @param {mineflayer.Bot} bot
 */

module.exports = (bot) => {
  bot.once("spawn", () => {
    console.log(`[${new Date().toLocaleTimeString().gray}] [${bot.username.yellow}] ${`Spawned`.green}`);
    bot.setControlState("back", true);
    bot.setControlState("back", false);
  });
  bot.on("playerJoined", async (player) => {
    var URL = `https://discord.com/api/webhooks/${ehookid}/${ehooktoken}`;
    request.post(URL, {
      json: {
        content: null,
        embeds: [
          {
            title: `**Player Joined**`,
            description: `**USERNAME: ${player.username}**\n **PING: ${player.ping}ms**\n **UUID: ${player.uuid}**`,
            color: 16276813,
            footer: {
              text: `${new Date().toLocaleTimeString()}`,
            },
            thumbnail: {
              url: `https://mc-heads.net/head/${player.username}`,
            },
          },
        ],
        attachments: [],
      },
    });
  });
};
