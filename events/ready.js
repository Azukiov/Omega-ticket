const { ActivityType } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    
    execute(client) {
        client.user.setActivity('**Tickets Customs**', { type: ActivityType.Watching });1e4
    }
}