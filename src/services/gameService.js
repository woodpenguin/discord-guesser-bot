const pool = require("./db");

async function saveGuess({
  discordUserId,
  discordUsername,
  game,
  guess,
  isCorrect,
}) {
  const today = getGameDate();

  await pool.query(
    `
    INSERT INTO guesses (
      discord_user_id,
      discord_username,
      game,
      game_date,
      guessed_character,
      is_correct
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [discordUserId, discordUsername, game, today, guess, isCorrect],
  );
}

function getGameDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

module.exports = {
  saveGuess,
};
