const { Events, Message } = require("discord.js");

const chalk = require("chalk");

module.exports = {
    name: Events.MessageCreate,

    /**
     * 
     * @param {Message} message 
     */

    execute(message) {
        const messageContent = message.content;
        if (messageContent === "-ping") {
            message.reply("Pong!");
        } else if (messageContent === "-help") {
            message.channel.send("Nah bruh no help for you");
        } else if (messageContent.charAt(0) === "-") {
            message.reply("Invalid command");
        }
    }
}