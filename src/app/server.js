const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebaseAdminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(bodyParser.json());

// Endpoint to store game data
app.post("/api/storeGameData", async (req, res) => {
  const { tries, success } = req.body;

  try {
    await db.collection("games").add({
      tries,
      success,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).send({ message: "Game data stored successfully" });
  } catch (error) {
    console.error("Error storing game data:", error);
    res.status(500).send({ message: "Failed to store game data" });
  }
});

// Endpoint to retrieve game statistics
app.get("/api/gameStats", async (req, res) => {
  try {
    const gamesSnapshot = await db.collection("games").get();
    const games = gamesSnapshot.docs.map((doc) => doc.data());

    const totalGames = games.length;
    const totalTries = games.reduce((acc, game) => acc + game.tries, 0);
    const averageTries = totalGames ? (totalTries / totalGames).toFixed(2) : 0;

    res.status(200).send({ totalGames, averageTries });
  } catch (error) {
    console.error("Error retrieving game statistics:", error);
    res.status(500).send({ message: "Failed to retrieve game statistics" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
