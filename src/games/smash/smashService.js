const characters = require("./characters.json");

function getDailyCharacter() {
  const randomIndex = Math.floor(Math.random() * characters.length);

  return characters[randomIndex];
}

module.exports = {
  getDailyCharacter,
};
