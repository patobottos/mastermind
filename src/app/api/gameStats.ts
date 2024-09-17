import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utilities/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const gamesSnapshot = await getDocs(collection(db, "games"));
      const games = gamesSnapshot.docs.map((doc) => doc.data());

      const totalGames = games.length;
      const totalTries = games.reduce((acc, game) => acc + game.tries, 0);
      const averageTries = totalGames
        ? (totalTries / totalGames).toFixed(2)
        : 0;

      res.status(200).json({ totalGames, averageTries });
    } catch (error) {
      console.error("Error retrieving game statistics:", error);
      res.status(500).json({ message: "Failed to retrieve game statistics" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
