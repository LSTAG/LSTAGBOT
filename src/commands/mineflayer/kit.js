const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

class KitCommand extends Command {
	constructor() {
		super("kit", {
			aliases: ["kit"],
			channel: "guild",
			category: "Mineflayer",
			ownerOnly: false,
			cooldown: 3.6e6,
			ratelimit: 1,
			description: {
				content:
					"This command lets acquire in game kits from the bot. Can only be used every 5 hours.",
				usage: "[username]",
				examples: ["OBNinjaa"],
			},
			args: [
				{
					id: "username",
					match: "rest",
					prompt: {
						start: "What is your username?",
						retry: "Invalid username.",
					},
				},
			],
		});
	}
	async exec(message, args) {
		const errorRes = new MessageEmbed();
		{
			errorRes;
			errorRes.setTitle(`__**Missing Argument**__`);
			errorRes.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
			errorRes.setDescription(
				stripIndents`You forgot to enter a username.\nUse **c.help kit** for the correct usage`
			);
			errorRes.setColor("#c36b6b");
			errorRes.setTimestamp();
		}

		if (!args.username) return message.channel.send(errorRes);
		await message.delete();
		const messageSend = new MessageEmbed();
		{
			messageSend;
			messageSend.setTitle(`__**Kit Request: ${args.username}**__`);
			messageSend.setThumbnail(
				`https://crafatar.com/avatars/${bot.player.uuid}`
			);
			messageSend.setDescription(
				`Great, all you need to do now is accept the teleport request from the bot.`
			);
			messageSend.setColor("#c36b6b");
			messageSend.setTimestamp();
		}
		message.channel.send(messageSend);
		bot.chat(`/tpa ${args.username}`);
		bot.chat(
			`/msg ${args.username} You requested a kit in ${message.guild.name}. Please accept the request and wait.`
		);
		setTimeout(() => {
			bot.chat(
				`/msg ${args.username} You can only use me every 5 hours. Spamming my commands will result in a ban.`
			);
			bot.chat(`/kill`);
		}, 13000);
	}
}

module.exports = KitCommand;

// Some server might not use /tpa instead they may use /tp. So change it.
