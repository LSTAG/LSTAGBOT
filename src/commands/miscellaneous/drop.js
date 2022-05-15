/**
 * @file Drop command
 * @author OBNinjaa
 * @since 1.0.0
 */

const bot = require(`../../index`);
const { prefix, successColor, errorColor, infoColor } = require("./../../config.json");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
  name: "drop",
  description: "This command will drop an item from the bots inventory of your choosing.",
  aliases: ["throw", "toss"],
  usage: "",
  cooldown: 5,
  args: true,

  /**
   * @description Executes when the command is called by command handler.
   * @author OBNinjaa
   * @param {Object} message The Message Object of the command.
   * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
   */

  async execute(message, args) {
    const myItem = args.join(" ").split(" ");
    if (myItem.length !== 1) {
      return message.reply(
        `You need to enter the item to drop.\nExample: \`${prefix}drop diamond\``
      );
    }
    let dropEmbed = new MessageEmbed()
      .setColor(0x4286f4)
      .setTitle(`Dropped ${myItem[0]}!`)
      .setDescription(
        `**${bot.username}** has dropped the item that you specified.\nYou can use \`${prefix}inventory\` to check the current inventory.`
      )
      .addField(stripIndents`Item currently set:`, `\n**Item:** ${myItem[0]}`);

      // Not yet added
  },
};
