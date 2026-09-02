const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getDailyCharacter } = require("../games/smash/smashService");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Shows today's Smash mystery character"),

  async execute(interaction) {
    try {
      const character = await getDailyCharacter();

      const embed = new EmbedBuilder()
        .setTitle("Today's Smash Character")
        .setDescription(`Today's mystery character is **${character.name}**!`)
        .setThumbnail(character.images.icon)
        .addFields(
          {
            name: "Series",
            value: character.series.name,
            inline: true,
          },
          {
            name: "Availability",
            value: character.availability,
            inline: true,
          },
        );

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      console.error("Error getting daily character:", error);

      await interaction.reply({
        content: "Something went wrong getting today's character.",
        ephemeral: true,
      });
    }
  },
};
