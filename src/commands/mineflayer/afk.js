const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");
const { pathfinder, Movements } = require("mineflayer-pathfinder");

bot.loadPlugin(pathfinder);

class AntiAFK extends Command {
	constructor() {
		super("afk", {
			aliases: ["afk", "antiafk"],
			channel: "guild",
			category: "Mineflayer",
			ownerOnly: false,
			cooldown: 6000,
			ratelimit: 3,
			description: {
				content: "This command makes it so the bot doesn't get idle kicked.",
				usage: "",
				examples: [],
			},
		});
	}
	async exec(message) {
		bot.setControlState("jump", true);

		const afk = new MessageEmbed();
		{
			afk;
			afk.setTitle(`__**AntiAFK Enabled**__`);
			afk.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
			afk.setDescription(
				stripIndents`Successfully enabled anti AFK. The will now not get kicked for being idle.`
			);
			afk.setColor("#c36ba4");
			afk.setTimestamp();
		}
		await message.channel.send(afk);
	}
}

module.exports = AntiAFK;
