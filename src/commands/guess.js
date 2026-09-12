const { SlashCommandBuilder } = require("discord.js");
const { getDailyCharacter } = require("../games/smash/smashService");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guess")
    .setDescription("Guess today's Smash Bros character")
    .addStringOption((option) =>
      option
        .setName("character")
        .setDescription("The Smash character you want to guess")
        .setRequired(true),
    ),

  async execute(interaction) {
    const guess = interaction.options.getString("character");
    const dailyCharacter = await getDailyCharacter();

    if (guess.toLowerCase() === dailyCharacter.name.toLowerCase()) {
      await interaction.reply(
        `🎉 Correct! Today's character is **${dailyCharacter.name}**!`,
      );
    } else {
      await interaction.reply(`❌ **${guess}** is not today's character.`);
    }
  },
};
