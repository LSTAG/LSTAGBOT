const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

class Ping extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping", "pong"],
      channel: "guild",
      category: "Utilities",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content: "This provides the ping of the bot.",
      },
    });
  }

  async exec(message) {
    await message.delete();
    const latency =
      message.createdTimestamp - message.createdTimestamp;
    const ping = new MessageEmbed();
    {
      ping;
      ping.setTitle(`__**Latency Check**__`);
      ping.setThumbnail(
        this.client.user.displayAvatarURL()
      );
      ping.setDescription(
        stripIndents`**Bot Latency**: \`${latency}ms\`\n **API Latency**: \`${Math.round(
          this.client.ws.ping
        )}ms\``
      );
      ping.setColor("#c36ba4");
      ping.setTimestamp();
    }
    message.channel.send(ping);
  }
}

module.exports = Ping;
