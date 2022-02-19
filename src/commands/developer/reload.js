const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

class ReloadCommand extends Command {
  constructor() {
    super("reload", {
      aliases: ["reload"],
      category: "Developer",
      ownerOnly: true,
      typing: true,
      quoted: false,
      description: {
        content:
          "Reloads a singular command or all commands.",
        permissions: [],
      },
      args: [
        {
          id: "commandID",
          type: "string",
          match: "rest",
          prompt: {
            start: "What command do you want to reload?",
            retry: "Invalid command.",
          },
        },
      ],
    });
  }

  async exec(message, args) {
    await message.delete();
    if (message.author.id !== this.client.ownerID)
      return message.util.reply(
        "This command can be only used by the bot developer."
      );
    if (args.commandID === "all") {
      this.handler.reloadAll();
      const embed = new MessageEmbed();
      {
        embed;
        embed.setTitle(`__**Reloaded All Commands**__`);
        embed.setThumbnail(
          this.client.user.displayAvatarURL()
        );
        embed.setDescription(
          stripIndents`Successfully reloaded all commands for **${this.client.user.username}**.`
        );
        embed.setColor("#c36ba4");
        embed.setTimestamp();
        embed.setFooter(
          this.client.user.username,
          this.client.user.displayAvatarURL()
        );
      }
      return message.channel.send({ embed });
    }
    this.handler.reload(args.commandID);
    const embed = new MessageEmbed();
    {
      embed;
      embed.setTitle(`__**Reloaded All Command**__`);
      embed.setThumbnail(
        this.client.user.displayAvatarURL()
      );
      embed.setDescription(
        stripIndents`Successfully reloaded the **${args.commandID}** command for **${this.client.user.username}**.`
      );
      embed.setColor("#c36ba4");
      embed.setTimestamp();
      embed.setFooter(
        this.client.user.username,
        this.client.user.displayAvatarURL()
      );
    }
    return message.channel.send({ embed });
  }
}

module.exports = ReloadCommand;
