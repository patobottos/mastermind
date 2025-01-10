"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utilities/firebaseConfig";
import RankingTopSection from "./RankingTopSection";
import WinPercentageChart from "./WinPercentageChart";
import TryDistributionChart from "./TryDistributionChart";
import FastestWin from "./FastestWin";

const RankingPage = () => {
  const [totalGames, setTotalGames] = useState(0);
  const [averageTries, setAverageTries] = useState(0);
  const [winPercentage, setWinPercentage] = useState(0);
  const [losePercentage, setLosePercentage] = useState(0);
  const [tryDistribution, setTryDistribution] = useState(new Array(8).fill(0)); // For tries 1-8
  const [fastestWin, setFastestWin] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true); // Start loading
        const gamesCollection = collection(db, "games");
        const gameSnapshot = await getDocs(gamesCollection);

        const gamesData = gameSnapshot.docs.map((doc) => doc.data());

        const totalGamesCount = gamesData.length;
        let winsCount = 0;
        let totalTries = 0;
        let fastestWinTry = Number.MAX_SAFE_INTEGER;
        const triesDistribution = new Array(8).fill(0);

        gamesData.forEach((game) => {
          const tries = game.tries;
          const isWin = game.state === "won";

          if (isWin) winsCount++;
          totalTries += tries;

          if (isWin && tries < fastestWinTry) fastestWinTry = tries;

          if (tries >= 1 && tries <= 8) triesDistribution[tries - 1]++;
        });

        const winRate = totalGamesCount > 0 ? Math.round((winsCount / totalGamesCount) * 100) : 0;
        const loseRate = 100 - winRate;
        const avgTries = totalGamesCount > 0 ? Math.round(totalTries / totalGamesCount) : 0;
        const fastestWinFinal = fastestWinTry === Number.MAX_SAFE_INTEGER ? 0 : fastestWinTry;

        // Update state
        setTotalGames(totalGamesCount);
        setAverageTries(avgTries);
        setWinPercentage(winRate);
        setLosePercentage(loseRate);
        setTryDistribution(triesDistribution);
        setFastestWin(fastestWinFinal);

        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching game data:", err);
        setError("Failed to load game statistics. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchGameData();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading game statistics...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-12">
      {/* Top Section - Total Games, Average Tries & Fastest Win */}
      <RankingTopSection totalGames={totalGames} averageTries={averageTries} fastestWin={fastestWin} />

      {/* Middle Section - Win Percentage */}
      <WinPercentageChart
        winPercentage={winPercentage}
        losePercentage={losePercentage}
      />

      {/* Bottom Section - Try Distribution */}
      <div className="flex justify-center">
        <div className="max-w-screen-lg">
          <TryDistributionChart tryDistribution={tryDistribution} />
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
