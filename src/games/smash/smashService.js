const characters = require("./characters.json");
const pool = require("../../services/db");

async function getDailyCharacter() {
  const today = getGameDate();

  // 1. Check if today's character already exists
  const [rows] = await pool.query(
    `
    SELECT character_name
    FROM daily_characters
    WHERE game = ?
      AND game_date = ?
    LIMIT 1
    `,
    ["smash", today],
  );

  if (rows.length > 0) {
    const characterName = rows[0].character_name;

    const character = characters.find(
      (character) => character.name === characterName,
    );

    return character;
  }

  // 2. Pick a random character
  const randomIndex = Math.floor(Math.random() * characters.length);
  const character = characters[randomIndex];

  // 3. Store today's character
  await pool.query(
    `
    INSERT INTO daily_characters (
      game,
      game_date,
      character_name
    )
    VALUES (?, ?, ?)
    `,
    ["smash", today, character.name],
  );

  // 4. Return the full character object
  return character;
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
  getDailyCharacter,
};
