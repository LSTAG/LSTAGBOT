const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

class SayCommand extends Command {
  constructor() {
    super("say", {
      aliases: ["say", "echo"],
      channel: "guild",
      category: "Mineflayer",
      ownerOnly: false,
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content:
          "This command lets you send a message to whatever minecraft server the bot is in.",
        usage: "[my custom message]",
        examples: ["hello world", "dsc.gg/wolkig"],
      },
      args: [
        {
          id: "string",
          match: "rest",
          prompt: {
            start: "What message do you want to send?",
            retry: "Invalid message.",
          },
        },
      ],
    });
  }
  async exec(message, args) {
    // if (args.string.startsWith("/")) {
    //   return message.channel.send(
    //     "You can't send a command to the minecraft server."
    //   );
    // }
    const errorRes = new MessageEmbed();
    {
      errorRes;
      errorRes.setTitle(`__**Missing Argument**__`);
      errorRes.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
      errorRes.setDescription(
        stripIndents`You forgot to enter the message you want to send.\nUse **c.help say** for the correct usage`
      );
      errorRes.setColor("#c36b6b");
      errorRes.setTimestamp();
    }

    if (!args.string) return message.channel.send(errorRes);
    await message.delete();
    const messageSend = new MessageEmbed();
    {
      messageSend;
      messageSend.setTitle(`__**Message Sent**__`);
      messageSend.setThumbnail(
        `https://crafatar.com/avatars/${bot.player.uuid}`
      );
      messageSend.setDescription(
        stripIndents`**AUTHOR:** ${message.author.username}\n**MESSAGE:** ${args.string}`
      );
      messageSend.setColor("#c36ba4");
      messageSend.setTimestamp();
    }
    message.channel.send(messageSend);

    bot.chat(`${args.string}`);
  }
}

module.exports = SayCommand;
