const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");
const antiafk = require("mineflayer-antiafk");

bot.loadPlugin(antiafk);

class CoordsCommand extends Command {
	constructor() {
		super("coords", {
			aliases: ["coords", "coord"],
			channel: "guild",
			category: "Mineflayer",
			ownerOnly: false,
			cooldown: 6000,
			ratelimit: 3,
			description: {
				content: "This command shows the coordinates of the bot.",
				usage: "",
				examples: [],
			},
		});
	}
	async exec(message) {
		// const x = bot.player.position.x;
		// const y = bot.player.position.y;
		// const z = bot.player.position.z;

		const coords = new MessageEmbed();
		{
			coords;
			coords.setTitle(`__**Coordinates For: ${bot.player.username}**__`);
			coords.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
			coords.setDescription(
				stripIndents`The coordinates for ${bot.player.username} are:
        X:${bot.entity.position.x} | Y:${bot.entity.position.y} | Z:${bot.entity.position.z}`
			);
			coords.setColor("#c36ba4");
			coords.setTimestamp();
		}
		// send embed
		await message.channel.send(coords);
	}
}

module.exports = CoordsCommand;
