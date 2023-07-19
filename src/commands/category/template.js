const { Interaction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("template")
            .setDescription("template-command description")
            .addStringOption(option => option.setName("option").setDescription("option description").setRequired(false)),

    /**
     * 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        const option = interaction.options.getString("option");
        await interaction.reply(`This is a template command.\nOption: ${option}`);
    }
}