const { Webhook } = require("discord-webhook-node");
const { bot } = require("../../index");
const settings = require("../../config/config.json");
const { chatLog, eventLog, debugLog } = settings;
const colors = require("colors");
const quickdb = require("quick.db");

const chat = new Webhook(chatLog);
const event = new Webhook(eventLog);
const debug = new Webhook(debugLog);

if (!event || !chat || !debug) {
	console.log("[ERROR] Please set up the webhooks in config.json".red);
}

bot.on("chat", (username, message) => {
	if (username === bot.username) return;
	if (message.includes("http")) return;
	chat.send(`**[${username}]** ${message}`);
	console.log(`[${username}] ${message}`.magenta);
});

bot.on("playerJoined", (player) => {
	if (player.username === bot.username) return;
	event.send(`**[${player.username}]** has joined the server`);
	console.log(`[${player.username}] has joined the server`.green);
	// for every username add to database
	quickdb.set(`blacklist_${player.username}`, false);
});

bot.on("playerLeft", (player) => {
	if (player.username === bot.username) return;
	event.send(`**[${player.username}]** has left the server`);
	console.log(`${player.username} has left the server`.grey);
});

bot.on("debug", (info) => {
	debug.send(`**[DEBUG]** ${info}`.yellow);
});

bot.on("serverRestart", () => {
	event.send("**[SERVER]** has restarted");
	console.log("[SERVER] has restarted".grey);
});
