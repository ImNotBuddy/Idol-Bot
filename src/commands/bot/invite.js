const { Interaction, SlashCommandBuilder } = require("discord.js");

const { rubyAww } = require("../../emojis.json");

const inviteLink = "https://discord.com/oauth2/authorize?client_id=1097101321649274930&permissions=8&scope=bot%20applications.commands"

module.exports = {
    data: new SlashCommandBuilder()
            .setName("invite")
            .setDescription("Invite me to your server <3"),

    /**
     * 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        await interaction.reply(`${rubyAww} Awwww! Thanks for wanting to invite me <3. Here's the link:\n${inviteLink}`);
    }
}