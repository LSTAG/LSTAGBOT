/**
 * @file Sample ping command
 * @author OBNinjaa
 * @since 1.0.0
 */

const bot = require(`../../index`);
const { prefix, successColor, errorColor } = require("./../../config.json");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const { pathfinder, Movements } = require("mineflayer-pathfinder");
const { GoalBlock } = require("mineflayer-pathfinder").goals;

bot.loadPlugin(pathfinder);

module.exports = {
  name: "location",
  description: "This commands shows the current location of the bot.",
  aliases: ["location", "coords"],
  usage: "",
  cooldown: 5,
  args: false,

  /**
   * @description Executes when the command is called by command handler.
   * @author OBNinjaa
   * @param {Object} message The Message Object of the command.
   */

  async execute(message) {
    let locationEmbed = new MessageEmbed();
    locationEmbed.setColor(0x4286f4);
    locationEmbed.setTitle(`**${bot.username}** Location`);
    locationEmbed.addField(
      stripIndents`The current location for **${bot.username}**:`,
      `\n**X:**${x} \n**Y:**${y} \n**Z:**${z}`
    );

    return message.channel.send({ embeds: [locationEmbed] });
  },
};
