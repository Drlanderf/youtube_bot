require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const myToken = process.env.BOT_TOKEN;

const client = new Client({
    intents:
        GatewayIntentBits.Guilds |
        GatewayIntentBits.GuildPresences |
        GatewayIntentBits.GuildMembers |
        GatewayIntentBits.GuildBans |
        GatewayIntentBits.GuildMessageReactions |
        GatewayIntentBits.GuildScheduledEvents |
        GatewayIntentBits.DirectMessages |
        GatewayIntentBits.MessageContent,
});

client.commands = new Collection();
client.commandArray = [];

console.log(`o--------------------------------------------o`);
console.log(`|           Thanks to use my bot             |`);
console.log(`o--------------------------------------------o`);

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.login(myToken).then();