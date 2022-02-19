const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

class InfoCommand extends Command {
  constructor() {
    super("info", {
      aliases: ["info", "stats"],
      channel: "guild",
      category: "Mineflayer",
      ownerOnly: false,
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content:
          "This command outputs basic information about the bot. Such as ping, health, version, UUID, and food.",
      },
    });
  }

  async exec(message) {
    const stats = new MessageEmbed();
    {
      stats;
      stats.setTitle(`__**Basic Information For: ${bot.player.username}**__`);
      stats.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
      stats.addField("Ping", `${bot.player.ping}`);
      stats.addField("Health", `${bot.health}`);
      stats.addField("Version", `${bot.version}`);
      stats.addField("UUID", `${bot.player.uuid}`);
      stats.addField("Food", `${bot.food}`);
      stats.setColor("#c36ba4");
      stats.setTimestamp();
    }
    await message.channel.send(stats);
  }
}

module.exports = InfoCommand;
