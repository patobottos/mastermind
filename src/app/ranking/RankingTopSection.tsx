"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface RankingTopSectionProps {
  totalGames: number;
  averageTries: number;
}

const RankingTopSection: React.FC<RankingTopSectionProps> = ({ totalGames, averageTries }) => {
  return (
    <div className="flex flex-col items-center space-y-8">
      {/* TOTAL GAMES */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold">
          Total Games Played
        </h2>
        <span className="text-4xl font-bold text-orange-300">{totalGames}</span>
      </div>

      {/* AVERAGE TRIES WITH CIRCULAR PROGRESS*/}
      <div className="w-32 h-32 space-y-4">
        <h2 className="text-xl font-medium">Average Tries</h2>
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
    </div>
  );
};

export default RankingTopSection;
