const { EmbedBuilder, Interaction, SlashCommandBuilder } = require("discord.js");
require("dotenv/config");

const axios = require("axios");
const chalk = require("chalk");

const { akanePout, rubyAngry } = require("../../emojis.json");

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userprofile")
        .setDescription("Get the avatar or banner of a user, in or outside of the server")
        .addSubcommand(subcommand =>
            subcommand.setName("avatar")
                .setDescription("Get the avatar of a user, in or outside of the server")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("User whose avatar you want. Use ID (if outside of the server) or ping. Leave blank for yours")
                        .setRequired(false)))

        .addSubcommand(subcommand =>
            subcommand.setName("banner")
                .setDescription("Get the banner of a user, in or outside of the server")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("User whose banner you want. Use ID (if outside of the server) or ping. Leave blank for yours")
                        .setRequired(false)))
    ,


    /**
     * 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        await interaction.deferReply()

        const subcommand = interaction.options.getSubcommand();
        const target = interaction.options.getUser("target") || interaction.user;
        const URL = `https://discord.com/api/users/${target.id}`;

        try {
            const response = await axios.get(URL, { headers: { Authorization: `Bot ${process.env.DISCORD_API_TOKEN}` } });

            if (response.status != 200) {
                await interaction.editReply(`An unexpected error occured with Discord's API ${rubyAngry}`)
            }

            if (!response.data[subcommand]) {
                await interaction.editReply({ content: `This user does not have a custom ${subcommand} ${rubyAngry}` });
                return;
            }

            const format = response.data[subcommand].startsWith("a_") ? "gif" : "webp";

            const picture = `https://cdn.discordapp.com/${subcommand}s/${target.id}/${response.data[subcommand]}.${format}?size=4096`;
            const picturePNG = `https://cdn.discordapp.com/${subcommand}s/${target.id}/${response.data[subcommand]}.png?size=4096`;
            const pictureJPEG = `https://cdn.discordapp.com/${subcommand}s/${target.id}/${response.data[subcommand]}.jpeg?size=4096`;

            const profileEmbed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(`${capitalizeFirstLetter(subcommand)} for ${target.username}`)
                .setImage(picture)
                .setTimestamp();

            if (format === "gif") {
                profileEmbed.setDescription(`Direct Link: [GIF](${picture})`);
            } else {
                profileEmbed.setDescription(`Direct Links: [WebP](${picture}) | [PNG](${`${picturePNG}`}) | [JPEG](${`${pictureJPEG}`})`);
            }

            await interaction.editReply({ embeds: [profileEmbed] });
        } catch (error) {
            console.log(chalk.red(`[profile.js] An error occured:\n${error}`));
            await interaction.editReply(`An unexpected error occured when I tried to get that users ${subcommand} ${akanePout}`);
        }
    }
}