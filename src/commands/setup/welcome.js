const { ActionRowBuilder, ChannelType, EmbedBuilder, Interaction, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

const welcomeSchema = require("../../schemas/welcomeSchema");

const { akanePout, rubyLove } = require("../../emojis.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("welcome")
        .setDescription("Create a cool personalised welcome message with advanced functionality")
        .addSubcommand(subcommand =>
            subcommand.setName("setup").setDescription("Setup up the welcome message itself. After you need to run /welcome channel to set the channel"))
        .addSubcommand(subcommand =>
            subcommand.setName("channel").setDescription("Set welcome message channel. Make sure you have run /welcome setup").addChannelOption(option =>
                option.setName("channel").setDescription("Channel to send the welcome message in").addChannelTypes(ChannelType.GuildText).setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName("clear").setDescription("Disable the welcome message and clear its options. Run /welcome setup and /welcome channel to enable"))
        .addSubcommand(subcommand =>
            subcommand.setName("preview").setDescription("Preview the welcome message")),

    /**
     * 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "channel") {
            const channel = interaction.options.getChannel("channel");
            const data = await welcomeSchema.findOne({ guildID: interaction.guild.id });
            if (!data) {
                await interaction.reply("You have not run /welcome setup yet!");
                return;
            }
            await welcomeSchema.findOneAndUpdate({ guildID: interaction.guild.id }, { channelID: channel });
            await interaction.reply(`Updated the channel to ${channel}`);

        } else if (subcommand === "clear") {
            const data = await welcomeSchema.findOne({ guildID: interaction.guild.id });

            if (!data) {
                await interaction.reply("You have not run /welcome setup yet!");
                return;
            }

            await welcomeSchema.findOneAndDelete({ guildID: interaction.guild.id });
            await interaction.reply(`${akanePout} Disabled the welcome message and cleared the data :(. To enable the welcome message use \`/welcome setup\` and then \`/welcome channel\``);

        } else if (subcommand === "preview") {
            const data = await welcomeSchema.findOne({ guildID: interaction.guild.id });

            if (!data) {
                await interaction.reply("You have not run /welcome setup yet!");
                return;
            }

            const replacedTitle = data.title.replace(/\[user\]/g, interaction.user).replace(/\[username\]/g, interaction.user.username).replace(/\[userdiscrim\]/g, interaction.user.discriminator).replace(/\[userid\]/g, interaction.user.id).replace(/\[servername\]/g, interaction.guild.name).replace(/\[membercount\]/g, interaction.guild.memberCount.toLocaleString());
            const replacedDescription = data.description.replace(/\[user\]/g, interaction.user).replace(/\[username\]/g, interaction.user.username).replace(/\[userdiscrim\]/g, interaction.user.discriminator).replace(/\[userid\]/g, interaction.user.id).replace(/\[servername\]/g, interaction.guild.name).replace(/\[membercount\]/g, interaction.guild.memberCount.toLocaleString());

            const welcomeEmbed = new EmbedBuilder()
                .setTitle(replacedTitle)
                .setDescription(replacedDescription)
                .setColor(data.color)
                .setImage(data.image)
                .setTimestamp();

            await interaction.reply({ content: `Here is a preview ${rubyLove} (if you do not see the image then there was a problem with the URL you inputted as Discord could not detect the image)`, embeds: [welcomeEmbed] });
        
        } else if (subcommand === "setup") {
            const modal = new ModalBuilder()
                .setCustomId("welcomeMessage")
                .setTitle("Welcome Message Setup");

            const syntax = new TextInputBuilder()
                .setCustomId("embedSyntax")
                .setLabel("Syntaxes")
                .setValue("[user] --> Mentions the user\n<#channelID> --> replace channelID with the ID of a channel to mention it\n[username] --> User's username\n[userdiscrim] --> User's discriminator\n[userid] --> User's ID\n[servername] --> Server name\n[membercount] --> Server member count")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(false);

            const title = new TextInputBuilder()
                .setCustomId("embedTitle")
                .setLabel("What would you like as the embed title?")
                .setPlaceholder("Example: Welcome to the [servername] server!")
                .setMaxLength(256)
                .setStyle(TextInputStyle.Short)
                .setRequired(true);


            const description = new TextInputBuilder()
                .setCustomId("embedDescription")
                .setLabel("What would you like as the embed description?")
                .setPlaceholder("Example: [user] Hey, [username], makure sure to read #rules! We now have [membercount] members! <3")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);

            const color = new TextInputBuilder()
                .setCustomId("embedColor")
                .setLabel("6 digit hex color code for the embed color")
                .setPlaceholder("Example: ##ed90f0")
                .setStyle(TextInputStyle.Short)
                .setRequired(true);

            const image = new TextInputBuilder()
                .setCustomId("embedImage")
                .setLabel("Link for an embed image/ gif")
                .setPlaceholder("Example: https://media.discordapp.net/attachments/882276686463389711/1097202561158746182/8NvAi6y.gif")
                .setStyle(TextInputStyle.Short)
                .setRequired(true);

            const firstActionRow = new ActionRowBuilder().addComponents(title);
            const secondActionRow = new ActionRowBuilder().addComponents(description);
            const thirdActionRow = new ActionRowBuilder().addComponents(color);
            const fourthActionRow = new ActionRowBuilder().addComponents(image);
            const fifthActionRow = new ActionRowBuilder().addComponents(syntax);

            modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

            await interaction.showModal(modal);
        }
    }
}