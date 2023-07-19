const { Client, Collection, GatewayIntentBits } = require("discord.js");
require("dotenv/config");

const eventHandler = require("./handlers/eventHandler");
const commandHandler = require("./handlers/commandHandler");

const { connect } = require("mongoose");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

eventHandler(client);
commandHandler(client);

(async () => {
    await connect(process.env.MONGODB_TOKEN).catch(console.error);
    client.login(process.env.DISCORD_API_TOKEN);
})();