const { Listener } = require("discord-akairo");
var colors = require("colors");
const quickdb = require("quick.db");

class Ready extends Listener {
	constructor() {
		super("ready", {
			event: "ready",
			emitter: "client",
		});
	}

	exec() {
		let i = 0;
		setInterval(
			() =>
				this.client.user.setActivity(
					`${this.client.guilds.cache.size} servers | ${this.client.users.cache.size} users`,
					{
						type: "WATCHING",
					}
				),
			15000
		);
		console.clear();
		console.log();
		console.log("Mineflayer Discord Bot".yellow);
		console.log("Created by OBNinjaa".yellow);
		console.log("dsc.gg/mineflayer".yellow);
		console.log();
	}
}

module.exports = Ready;
