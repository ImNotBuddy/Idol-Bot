const { ActivityType, Events } = require("discord.js");

const chalk = require("chalk");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity({ name: "/invite", type: ActivityType.Listening });
        console.log(chalk.green(`\n[Client Ready] ${client.user.tag} is online`));
    }
}