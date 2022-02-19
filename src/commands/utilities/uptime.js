const { Command } = require("discord-akairo");
const ms = require("ms");

class Uptime extends Command {
  constructor() {
    super("uptime", {
      aliases: ["uptime", "up"],
      channel: "guild",
      category: "Utilities",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content: "This provides the current uptime of the bot.",
      },
    });
  }

  async exec(message) {
    await message.delete();
    message.channel.send(
      `I have been awake for \`${ms(this.client.uptime, { long: true })}\``
    );
  }
}

module.exports = Uptime;
