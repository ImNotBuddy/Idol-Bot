const fs = require("node:fs");
const path = require("node:path");

const { connection } = require("mongoose");

const chalk = require("chalk");

module.exports = (client) => {
    const eventsFolderPath = path.join(__dirname, "../events");
    const eventsFolder = fs.readdirSync(eventsFolderPath);

    let loadedEvents = 0;

    console.log(chalk.cyan("[Event Handler] Loading events..."));

    for (const folder of eventsFolder) {
        const eventsPath = path.join(eventsFolderPath, folder);
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);

            switch (folder) {
                case "client":
                    if (event.once) {
                        client.once(event.name, (...args) => event.execute(...args));
                    } else {
                        client.on(event.name, (...args) => event.execute(...args));
                    }

                case "mongo":
                    if (event.once) {
                        connection.once(event.name, (...args) => event.execute(...args));
                    } else {
                        connection.on(event.name, (...args) => event.execute(...args));
                    }
                default:
                    break;
            }

            loadedEvents++;
        }
    }

    console.log(chalk.green(`[Event Handler] Loaded ${loadedEvents} events`));
}