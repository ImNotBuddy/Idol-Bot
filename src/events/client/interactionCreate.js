const { EmbedBuilder, Events, Interaction } = require("discord.js");

const chalk = require("chalk");

const { akanePout, rubyAngry, rubyLove } = require("../../emojis.json");

const welcomeSchema = require("../../schemas/welcomeSchema");

const validURLRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const validHexCodeRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

module.exports = {
    name: Events.InteractionCreate,

    /**
     * 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(chalk.red(`[Interaction Create] No command matching ${interaction.commandName} was found.`));
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(chalk.red(`[Interaction Create] Error executing ${interaction.commandName}`));
                console.error(error);
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId === "welcomeMessage") {
                const title = interaction.fields.getTextInputValue("embedTitle");
                const description = interaction.fields.getTextInputValue("embedDescription");
                const color = interaction.fields.getTextInputValue("embedColor");
                const image = interaction.fields.getTextInputValue("embedImage").trim();

                if (!validHexCodeRegex.test(color)) {
                    await interaction.reply(`${rubyAngry} That's not a hex color code. Search 'google color picker' for a color picker and copy the HEX of the color`);
                    return; 
                }

                if (!validURLRegex.test(image)) {
                    await interaction.reply(`${akanePout} That's not a URL! I would recommend getting an image URL by sending the image on discord and then pressing right click and then copy link`);
                    return;
                }

                let data = await welcomeSchema.findOne({ guildID: interaction.guild.id });

                if (!data) {
                    data = await new welcomeSchema({
                        guildID: interaction.guild.id,
                        title: title,
                        description: description,
                        color: color,
                        image: image
                    });
                    await data.save().catch(console.error);
                } else {
                    data = {
                        guildID: interaction.guild.id,
                        title: title,
                        description: description,
                        color: color,
                        image: image
                    };
                    await welcomeSchema.findOneAndUpdate({ guildID: interaction.guild.id }, data);
                }

                const replacedTitle = title.replace(/\[user\]/g, interaction.user).replace(/\[username\]/g, interaction.user.username).replace(/\[userdiscrim\]/g, interaction.user.discriminator).replace(/\[userid\]/g, interaction.user.id).replace(/\[servername\]/g, interaction.guild.name).replace(/\[membercount\]/g, interaction.guild.memberCount.toLocaleString());
                const replacedDescription = description.replace(/\[user\]/g, interaction.user).replace(/\[username\]/g, interaction.user.username).replace(/\[userdiscrim\]/g, interaction.user.discriminator).replace(/\[userid\]/g, interaction.user.id).replace(/\[servername\]/g, interaction.guild.name).replace(/\[membercount\]/g, interaction.guild.memberCount.toLocaleString());

                const welcomeEmbed = new EmbedBuilder()
                    .setTitle(replacedTitle)
                    .setDescription(replacedDescription)
                    .setColor(color)
                    .setImage(image)
                    .setTimestamp();

                await interaction.reply({ content: `Here is a preview ${rubyLove} (if you do not see the image then there was a problem with the URL you inputted as Discord could not detect the image)`, embeds: [welcomeEmbed] });
            }
        }
    }
}