const { stripIndents } = require("common-tags");
const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class HelpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["help", "commands"],
      args: [
        {
          id: "command",
          type: "commandAlias",
          default: null,
        },
      ],
      category: "Utilities",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content: "Displays information about a command",
        usage: "[command]",
        examples: ["userinfo"],
      },
    });
  }

  async exec(message, { command }) {
    await message.delete();
    const prefix = this.handler.prefix;
    const embed = new MessageEmbed().setColor("#c36ba4");

    if (command) {
      embed
        .setColor("#c36ba4")
        .addField(
          "❯ Description:",
          command.description.content ||
            "No Description provided"
        )
        .addField(
          "❯ Usage:",
          `\`${command.aliases[0]} ${
            command.description.usage
              ? command.description.usage
              : ""
          }\``
        );

      if (command.aliases.length > 1) {
        embed.addField(
          "❯ Aliases Available:",
          `\`${command.aliases.join("`, `")}\``
        );
      }
      if (
        command.description.examples &&
        command.description.examples.length
      ) {
        embed.addField(
          "❯ Example:",
          `\`${
            command.aliases[0]
          } ${command.description.examples.join(
            `\`\n\`${command.aliases[0]} `
          )}\``
        );
      }
    } else {
      embed
        .setTitle("__**Cloudy Discord Bot**__")
        .setThumbnail(this.client.user.displayAvatarURL())
        .setDescription(
          stripIndents`
                    These are the commands which are executable for usage in **${this.client.user.username}**.
					For additional info on a command, type \`c.help <command>\`.`
        )
        .setFooter(
          this.client.user.username,
          this.client.user.displayAvatarURL()
        )
        .setTimestamp();

      for (const category of this.handler.categories.values()) {
        embed.addField(
          `❯ ${category.id.replace(/(\b\w)/gi, (lc) =>
            lc.toUpperCase()
          )}:`,
          `${category
            .filter((cmd) => cmd.aliases.length > 0)
            .map((cmd) => `\`${cmd.aliases[0]}\``)
            .join(" , ")}`
        );
      }
      embed.addField(`__Quick Links__`, [
        `[**GitHub Repository**](https://github.com/OBNinjaa)`,
        `[**Discord Server**](https://discord.gg/a9sNYKVXCU)`,
      ]);
    }

    return message.util.send(embed).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 60000);
    });
  }
}

module.exports = HelpCommand;
