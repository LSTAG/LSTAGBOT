const {
	AkairoClient,
	CommandHandler,
	ListenerHandler,
	InhibitorHandler,
} = require("discord-akairo");
const mineflayer = require("mineflayer");

const settings = require("./config/config.json");
const { token, username, password, host, port, version, auth } = settings;
const colors = require("colors");
const { config } = require("dotenv");
const { join } = require("path");

config();

if (!host || !username || !password || !version || !auth) {
	console.log("[ERROR] Please fill out config.json".red);
	process.exit(1);
}

const bot = mineflayer.createBot({
	host: host,
	username: username,
	password: password,
	port: port || null,
	version: version,
	auth: auth,
	verbose: true,
});

module.exports = { bot };

if (username === bot.username) return;

const commandsPath = join(__dirname, "..", "commands/");
const listenersPath = join(__dirname, "..", "listeners/");

class Akairo extends AkairoClient {
	constructor() {
		super(
			{
				ownerID: "709202831760162910",
			},
			{
				disableEveryone: true,
			}
		);

		this.commandHandler = new CommandHandler(this, {
			prefix: ["c."],
			blockBots: true,
			blockClient: true,
			allowMention: true,
			defaultCooldown: 800,
			commandUtil: true,
			directory: join(__dirname, "commands"),
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: join(__dirname, "listeners"),
		});
		this.inhibitorHandler = new InhibitorHandler(this, {
			directory: join(__dirname, "./inhibitors/"),
		});

		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler,
		});

		this.inhibitorHandler.loadAll();
		this.listenerHandler.loadAll();
		this.commandHandler.loadAll();
	}
}

const client = new Akairo();

client.login(token);
