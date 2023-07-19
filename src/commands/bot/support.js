const { Interaction, SlashCommandBuilder } = require("discord.js");

const { rubyLove } = require("../../emojis.json");

const inviteLink = "https://discord.gg/4n3pvghHCj"

module.exports = {
    data: new SlashCommandBuilder()
            .setName("support")
            .setDescription("Come on over to our support server for help"),

    /**
     * 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        await interaction.reply(`${rubyLove} Here's the link ${rubyLove}\n${inviteLink}`);
    }
}