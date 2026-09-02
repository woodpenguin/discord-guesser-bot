const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guess")
    .setDescription("Guess today's Smash Bros champion")
    .addStringOption((option) =>
      option
        .setName("character")
        .setDescription("The Smash character you want to guess")
        .setRequired(true),
    ),

  async execute(interaction) {
    const character = interaction.options.getString("character");

    await interaction.reply(`You guessed: ${character}`);
  },
};
