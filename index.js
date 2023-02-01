const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent],
    shards: "auto",
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.ThreadMember
    ]
});
const { readdirSync } = require("fs");
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { getEnvironmentData } = require('worker_threads');
require("dotenv").config();
require("./api.js");

client.commands = new Collection();

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };


const slashcommands = [];
readdirSync("./slashCommands/").forEach(async file => {
    const slashcommand = require(`./slashCommands/${file}`);
    slashcommands.push(slashcommand.data.toJSON());
    client.commands.set(slashcommand.data.name, slashcommand);
})

readdirSync("./events/").forEach(async file => {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
});

client.on("ready", async (client) => {
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: slashcommands },
        );
    } catch (error) {
        console.error(error);
    }
    log(`Logged in as ${client.user.tag}!`);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});
process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
});
process.on('warning', error => {
    console.error('Warning:', error);
});
process.on("uncaughtExceptionMonitoring" , error => {
    console.error('Uncaught exception monitoring:', error);
});
process.on("rejectionHandled" , promise => {
    console.error('Rejection handled:', promise);
});

client.login(process.env.TOKEN);