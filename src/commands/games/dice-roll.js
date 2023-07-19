const { Interaction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("dice-roll")
            .setDescription("Roll up to 10 6-sided dice")
            .addIntegerOption(option => option.setName("dice").setDescription("Number of dice to roll").setMinValue(1).setMaxValue(10).setRequired(false)),

    /**
     * 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        await interaction.deferReply()
        const dice = interaction.options.getInteger("dice");

        if (!dice) {
            const roll = Math.floor(Math.random() * 6) + 1;
            await interaction.editReply(`You rolled: ${roll}`);
            return;
        }

        let message = "**Dice Rolled!**"
        let total = 0

        for (let i = 0; i < dice; i++) {
            const roll = Math.floor(Math.random() * 6) + 1;
            total += roll;
            message = message + `\nDice ${i+1}: ${roll}`
        }

        message = message + `\nTotal: ${total}`;
        
        await interaction.editReply(message)
    }
}