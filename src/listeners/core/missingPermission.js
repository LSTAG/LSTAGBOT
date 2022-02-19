const { Listener } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

class MissingPermissionsListener extends Listener {
	constructor() {
		super("missingPermissions", {
			emitter: "commandHandler",
			event: "missingPermissions",
		});
	}

	async exec(message, command, type, missing) {
		if (type == "client") {
			const result = missingPermissions(message.guild.me, missing);
			const embed = new MessageEmbed();
			{
				embed;
				embed.setTitle("__**Client Doesn't Have Permission**__");
				embed.setThumbnail(message.author.displayAvatarURL());
				embed.setDescription(stripIndents`Sorry, i was unable to exacute this command!
        **❯** In order for this command to work i need the **\`${result.toUpperCase()}\`** permission!`);
				embed.setColor("#c36ba4");
				embed.setTimestamp();
				embed.setFooter(
					this.client.user.username,
					this.client.user.displayAvatarURL()
				);
			}
			return message.channel.send({ embed });
		} else if (type == "user") {
			const result = missingPermissions(message.member, missing);
			const embed = new MessageEmbed();
			{
				embed;
				embed.setTitle("__**You Doesn't Have Permission**__");
				embed.setThumbnail(message.author.displayAvatarURL());
				embed.setDescription(stripIndents`Sorry, you are unable to exacute this command!
        **❯** To use this command you need the **\`${result.toUpperCase()}\`** permission!`);
				embed.setColor("#c36ba4");
				embed.setTimestamp();
				embed.setFooter(
					this.client.user.username,
					this.client.user.displayAvatarURL()
				);
			}
			return message.channel.send({ embed });
		}
	}
}

const missingPermissions = (usr, permissions) => {
	// eslint-disable-next-line no-shadow
	const missingPermissions = usr.permissions
		.missing(permissions)
		// eslint-disable-next-line require-unicode-regexp
		.map(
			(str) =>
				`\`${str
					.replace(/_/g, " ")
					.toLowerCase()
					// eslint-disable-next-line prefer-named-capture-group, require-unicode-regexp
					.replace(/\b(\w)/g, (char) => char.toUpperCase())}\``
		);

	return missingPermissions.length > 1
		? `${missingPermissions.slice(0, -1).join(", ")} and ${
				missingPermissions.slice(-1)[0]
		  }`
		: missingPermissions[0];
};

module.exports = MissingPermissionsListener;
