const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

const { pathfinder, Movements } = require("mineflayer-pathfinder");
const { GoalBlock } = require("mineflayer-pathfinder").goals;

bot.loadPlugin(pathfinder);

class SayCommand extends Command {
  constructor() {
    super("goto", {
      aliases: ["goto", "go"],
      channel: "guild",
      category: "Mineflayer",
      ownerOnly: false,
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content:
          "This command lets you control the bots movement. It will move the bot to the coordinates you set.",
        usage: "[X, Y, Z]",
        examples: ["200 80 10", "1000000 80 -1999"],
      },
      args: [
        {
          id: "x",
          type: "number",
        },
        {
          id: "y",
          type: "number",
        },
        {
          id: "z",
          type: "number",
        },
      ],
    });
  }

  async exec(message, args) {
    const xCoord = new MessageEmbed();
    {
      xCoord;
      xCoord.setTitle(`__**Missing Argument**__`);
      xCoord.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
      xCoord.setDescription(
        stripIndents`You for got to enter the **X** coordinate.`
      );
      xCoord.setColor("#c36b6b");
      xCoord.setTimestamp();
    }
    const yCoord = new MessageEmbed();
    {
      yCoord;
      yCoord.setTitle(`__**Missing Argument**__`);
      yCoord.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
      yCoord.setDescription(
        stripIndents`You for got to enter the **Y** coordinate.`
      );
      yCoord.setColor("#c36b6b");
      yCoord.setTimestamp();
    }
    const zCoord = new MessageEmbed();
    {
      zCoord;
      zCoord.setTitle(`__**Missing Argument**__`);
      zCoord.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
      zCoord.setDescription(
        stripIndents`You for got to enter the **Z** coordinate.`
      );
      zCoord.setColor("#c36b6b");
      zCoord.setTimestamp();
    }
    if (!args.x) return message.channel.send(xCoord);
    if (!args.y) return message.channel.send(yCoord);
    if (!args.z) return message.channel.send(zCoord);

    const maxDistance = 1000000;
    const distance = bot.entity.position.distanceTo(args);
    if (distance > maxDistance) {
      const tooFar = new MessageEmbed();
      {
        tooFar;
        tooFar.setTitle(`__**Too Far Away**__`);
        tooFar.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
        tooFar.setDescription(
          stripIndents`The bot can't move to a location that is too far away. The maximum distance is **${maxDistance}** blocks. You are **${distance}** blocks away.`
        );
        tooFar.setColor("#c36ba4");
        tooFar.setTimestamp();
      }
      return message.channel.send(tooFar);
    }

    const mcData = require("minecraft-data")(bot.version);
    const defaultMove = new Movements(bot, mcData);
    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new GoalBlock(args.x, args.y, args.z));

    bot.on("death", () => {
      bot.pathfinder.stop();
      // send embed
      const died = new MessageEmbed();
      {
        died;
        died.setTitle(`__**${bot.player.username} Died**__`);
        died.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
        died.setDescription(
          stripIndents`The bot was not successful at making it to the coordinates. Please try again.`
        );
        died.setColor("#c36ba4");
        died.setTimestamp();
      }
      message.channel.send(died);
    });

    const messageSend = new MessageEmbed();
    {
      messageSend;
      messageSend.setTitle(`__**Pathfinder: ${args.x},${args.y},${args.z}**__`);
      messageSend.setThumbnail(
        `https://crafatar.com/avatars/${bot.player.uuid}`
      );
      messageSend.setDescription(
        stripIndents`Moving towards the set coordinates.\nX: **${args.x}**\nY: **${args.y}**\nZ: **${args.z}**`
      );
      messageSend.setColor("#c36ba4");
      messageSend.setTimestamp();
    }

    message.channel.send(messageSend);
  }
}

module.exports = SayCommand;
