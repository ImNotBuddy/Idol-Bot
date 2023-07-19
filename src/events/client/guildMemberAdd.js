const { EmbedBuilder, Events, GuildMember } = require("discord.js");

const chalk = require("chalk");

const welcomeSchema = require("../../schemas/welcomeSchema");

module.exports = {
    name: Events.GuildMemberAdd,

    /**
     * 
     * @param {GuildMember} member 
     */

    async execute(member) {
        const data = await welcomeSchema.findOne({ guildID: member.guild.id });

        if (!data || !data.channelID) {
            console.log(chalk.yellow("No data || No channel set"));
            return;
        } else {
            console.log(chalk.yellow("Found all necessary data!"));
            try {
                const channel = member.guild.channels.cache.get(data.channelID);

                if (!channel) {
                    console.log(chalk.yellow("Channel no longer exists in the server"));
                    return;
                }

                const replacedTitle = data.title.replace(/\[user\]/g, member.user).replace(/\[username\]/g, member.user.username).replace(/\[userdiscrim\]/g, member.user.discriminator).replace(/\[userid\]/g, member.user.id).replace(/\[servername\]/g, member.guild.name).replace(/\[membercount\]/g, member.guild.memberCount.toLocaleString());
                const replacedDescription = data.description.replace(/\[user\]/g, member.user).replace(/\[username\]/g, member.user.username).replace(/\[userdiscrim\]/g, member.user.discriminator).replace(/\[userid\]/g, member.user.id).replace(/\[servername\]/g, member.guild.name).replace(/\[membercount\]/g, member.guild.memberCount.toLocaleString());


                const welcomeEmbed = new EmbedBuilder()
                    .setTitle(replacedTitle)
                    .setDescription(replacedDescription)
                    .setColor(data.color)
                    .setImage(data.image)
                    .setTimestamp();

                await channel.send({ embeds: [welcomeEmbed] });

            } catch (error) {
                console.log(chalk.red(`[guildMemberAdd.js] Error:\n${error}`));
            }
        }

    }
}