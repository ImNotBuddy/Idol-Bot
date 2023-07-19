const { Interaction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("coinflip")
            .setDescription("Flip a coin"),

    /**
     * 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        const randomNumber = Math.floor(Math.random() * 2);
        const result = randomNumber === 0 ? "Heads" : "Tails";
        await interaction.reply(`:coin: ${interaction.user.username} flipped **${result}**`);
    }
}