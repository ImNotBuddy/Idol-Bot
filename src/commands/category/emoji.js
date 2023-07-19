const { Interaction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("emoji")
        .setDescription("Emoji commands")
        .addSubcommand(subcommand =>
            subcommand.setName("add").setDescription("Add an emoji to a server").addStringOption(option => option.setName("emoji").setDescription("Link or the to the emoji to add").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName("remove").setDescription("Remove an emoji from the server").addStringOption(option => option.setName("emoji").setDescription("The to the emoji to remove").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName("rename").setDescription("Rename an emoji in the server").addStringOption(option => option.setName("emoji").setDescription("The to the emoji to rename").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName("enlarge").setDescription("Send a bigger version of an emoji").addStringOption(option => option.setName("emoji").setDescription("The to the emoji to send enlarged").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName("import").setDescription("Import emojis from a zip file").addStringOption(option => option.setName("zip-file").setDescription("Link or the to the emoji to add").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName("export").setDescription("Export all server emojis as a zip"))
        .addSubcommand(subcommand =>
            subcommand.setName("list").setDescription("List all server emojis")),

    /**
     * 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const option = interaction.options.getString("option");

        switch (subcommand) {
            case "add":

                break;

            case "remove":

                break;

            case "rename":

                break;

            case "enlarge":

                break;

            case "import":

                break;

            case "export":

                break;

            case "export":

                break;

            default:
                break;
        }

        await interaction.reply(`This is a template command.\nOption: ${option}`);
    }
}