"use client";

import React, { useEffect, useState } from 'react';
import RankingTopSection from './RankingTopSection';
import WinPercentageChart from '../../components/WinPercentageChart';
import TryDistributionChart from './TryDistributionChart';
import FastestWin from './FastestWin';

const RankingPage = () => {
  const [totalGames, setTotalGames] = useState(0);
  const [averageTries, setAverageTries] = useState(0);
  const [winPercentage, setWinPercentage] = useState(0);
  const [losePercentage, setLosePercentage] = useState(0);
  const [tryDistribution, setTryDistribution] = useState([0, 0, 0, 0, 0, 0]);
  const [fastestWin, setFastestWin] = useState(0);

  useEffect(() => {
    // Fetch data from Firebase (dummy data as example)
    const fetchedData = {
      totalGames: 120,
      averageTries: 3,
      winPercentage: 65,
      losePercentage: 35,
      tryDistribution: [10, 25, 30, 20, 15, 10],
      fastestWin: 2,
    };

    // Set state based on fetched data
    setTotalGames(fetchedData.totalGames);
    setAverageTries(fetchedData.averageTries);
    setWinPercentage(fetchedData.winPercentage);
    setLosePercentage(fetchedData.losePercentage);
    setTryDistribution(fetchedData.tryDistribution);
    setFastestWin(fetchedData.fastestWin);
  }, []);

  return (
    <div className="p-6 space-y-12">
      {/* Top Section */}
      <RankingTopSection totalGames={totalGames} averageTries={averageTries} />

      {/* Middle Section - Win Percentage */}
      <WinPercentageChart winPercentage={winPercentage} losePercentage={losePercentage} />

      {/* Bottom Section - Try Distribution & Fastest Win */}
      <div className="grid grid-cols-1 gap-6">
        <TryDistributionChart tryDistribution={tryDistribution} />
        <FastestWin fastestWin={fastestWin} />
      </div>
    </div>
  );
};

export default RankingPage;
