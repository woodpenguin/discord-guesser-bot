require("dotenv").config();
const pool = require("./services/db");
const { getDailyCharacter } = require("./games/smash/smashService");

const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

const guessCommand = require("./commands/guess");
//const dailyCommand = require("./commands/daily");

client.commands.set(guessCommand.data.name, guessCommand);
//client.commands.set(dailyCommand.data.name, dailyCommand);

client.once("clientReady", () => {
  console.log(`bot is online as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    const message = {
      content: "Something went wrong while running that command.",
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(message);
    } else {
      await interaction.reply(message);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

async function testDatabase() {
  try {
    const [rows] = await pool.query("SELECT 1 AS test");

    console.log("Database connected!");
    console.log(rows);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testDatabase();
async function test() {
  try {
    const character = await getDailyCharacter();

    console.log("Daily character:");
    console.log(character);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

test();
