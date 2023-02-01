const { ActivityType } = require("discord.js");
const config = require("../config/config.json");

module.exports = {
    name: 'ready',
    once: true,
    
    execute(client) {
        client.user.setActivity(`Version ${config.version}`, { type: ActivityType.Watching });1e4
    }
}