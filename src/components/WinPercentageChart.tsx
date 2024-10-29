"use client";

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface WinPercentageChartProps {
    winPercentage: number;
    losePercentage: number;
  }

const WinPercentageChart: React.FC<WinPercentageChartProps> = ({ winPercentage, losePercentage }) => {
  const data = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [winPercentage, losePercentage],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold my-4">Win Percentage</h2>
      <div className="w-48 h-48">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default WinPercentageChart;