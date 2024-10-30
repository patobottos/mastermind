"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import FastestWin from "./FastestWin";
import "react-circular-progressbar/dist/styles.css";

interface RankingTopSectionProps {
  totalGames: number;
  averageTries: number;
  fastestWin: number;
}

const RankingTopSection: React.FC<RankingTopSectionProps> = ({
  totalGames,
  averageTries,
  fastestWin,
}) => {
  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Total Games */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Total Games Played</h2>
        <span className="text-4xl font-bold text-orange-300">{totalGames}</span>
      </div>

      {/* Average Tries with Circular Progress */}
      <div className="flex flex-col items-center space-y-8">
        <div className="w-48 h-48 flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-semibold">Average Tries</h2>
          <CircularProgressbar
            value={averageTries}
            maxValue={8}
            text={`${averageTries} Tries`}
            styles={buildStyles({
              textColor: "#fdba74",
              pathColor: "#075985",
              trailColor: "#e4e4e7",
            })}
          />
        </div>

        {/* Fastest Win */}
        <div className="text-center mt-4">
          <FastestWin fastestWin={fastestWin} />
        </div>
      </div>
    </div>
  );
};

export default RankingTopSection;

