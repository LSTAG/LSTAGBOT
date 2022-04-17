/**
 * @file Dynamic help command
 * @author OBNinjaa
 * @since 1.0.0
 */

const { prefix } = require("./../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "List all commands of bot or info about a specific command.",
  aliases: ["commands"],
  usage: "[command name]",
  cooldown: 5,

  /**
   * @description Executes when the command is called by command handler.
   * @author OBNinjaa
   * @param {Object} message The Message Object of the command.
   * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
   */

  execute(message, args) {
    const { commands } = message.client;

    if (!args.length) {
      /**
       * @type {Object}
       * @description Help command embed object
       */

      let helpEmbed = new MessageEmbed()
        .setColor(0x4286f4)
        .setURL(process.env.URL)
        .setTitle("List of all my commands")
        .setDescription("`" + commands.map((command) => command.name).join("`, `") + "`")

        .addField(
          "Usage",
          `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
        );

      return message.channel.send({ embeds: [helpEmbed] }).catch((error) => {
        console.error(`Could not send help DM to ${message.author.tag}.\n`, error);

        message.reply({ content: "It seems like I can't DM you!" });
      });
    }

    /**
     * @type {String}
     * @description First argument in lower case
     */

    const name = args[0].toLowerCase();

    /**
     * @type {Object}
     * @description The command object
     */

    const command =
      commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply({ content: "That's not a valid command!" });
    }

    /**
     * @type {Object}
     * @description Embed of Help command for a specific command.
     */

    let commandEmbed = new MessageEmbed().setColor(0x4286f4).setTitle(`Command: ${command.name}`);

    if (command.description) commandEmbed.setDescription(`${command.description}`);

    if (command.aliases)
      commandEmbed
        .addField("Aliases", `\`${command.aliases.join(", ")}\``, true)
        .addField("Cooldown", `${command.cooldown || 3} second(s)`, true);
    if (command.usage)
      commandEmbed.addField("Usage", `\`${prefix}${command.name} ${command.usage}\``, true);

    message.channel.send({ embeds: [commandEmbed] });
  },
};
