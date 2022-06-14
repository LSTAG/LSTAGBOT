/**
 * @file Kit Command
 * @author OBNinjaa
 * @since 1.0.0
 */

const bot = require(`../../index`);
const { prefix, successColor, errorColor, infoColor } = require("./../../config.json");
const { MessageEmbed } = require("discord.js");

const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "kit",
  description: "This command if for anarchy servera. The bot teleports and drops the kit on the floor.",
  aliases: ["", ""],
  usage: "OBNinjaa",
  cooldown: 5,
  args: true,

  /**
   * @description Executes when the command is called by command handler.
   * @author OBNinjaa
   * @param {Object} message The Message Object of the command.
   * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
   */

  async execute(message, args) {
    const myUser = args.join(" ").split(" ");
    if (myUser.length !== 1) {
      return message.reply(`Please enter 1 argument, the username of the user you want to teleport to.`);
    }

    let successEmbed = new MessageEmbed();
    successEmbed.setColor(successColor);
    successEmbed.setTitle("Kit Command");
    successEmbed
      .setDescription(`**${bot.username}** is now teleporting to **${myUser[0]}**.\nYou can use this command again after 60 minuets.`)
      .addField(`User Teleported To:`, `\n${myUser[0]}`);
    return message.channel.send({ embeds: [successEmbed] }).then(async () => {
      bot.chat(`/tpa ${myUser}`);
      bot.on("forcedMove", () => {
        bot.chat("/kill");
      });

      db.set(myUser[0], true);
      setTimeout(() => {
        db.delete(myUser[0]);
        let cooldownEmbed = new MessageEmbed();
        cooldownEmbed.setColor(infoColor);
        cooldownEmbed.setTitle("Cooldown Removed");
        cooldownEmbed
          .setDescription(`${message.author} I have removed **${myUser[0]}** from the cooldown list.\nYou now use the kit command again.`)
          .addField(`User Removed:`, `\n${myUser[0]}`);
        return message.channel.send({ embeds: [cooldownEmbed] });
      }, 3.6e6);
    });
  },
};
