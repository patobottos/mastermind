import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utilities/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { tries, success } = req.body;

    try {
      await addDoc(collection(db, "games"), {
        tries,
        success,
        timestamp: serverTimestamp(),
      });
      res.status(200).json({ message: "Game data stored successfully" });
    } catch (error) {
      console.error("Error storing game data:", error);
      res.status(500).json({ message: "Failed to store game data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
