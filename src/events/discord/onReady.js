/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 */

const bot = require(`../../index`);
const colors = require("colors");

module.exports = {
  name: "ready",
  once: true,

  /**
   * @description Executes the block of code when client is ready (bot initialization)
   * @param {Object} client Main Application Client
   */
  execute(client) {
    console.log(
      `[${new Date().toLocaleTimeString().gray}] [${client.user.tag.yellow}] ${
        `Discord bot ready!`.green
      }`
    );
    client.user.setActivity(`In Development`, {
      type: "STREAMING",
      url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
    });
  },
};
