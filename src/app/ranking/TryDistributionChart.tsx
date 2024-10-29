"use client";

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { BsBorderWidth } from 'react-icons/bs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TryDistributionChartProps {
    tryDistribution: number[];
} 


const TryDistributionChart: React.FC<TryDistributionChartProps> = ({ tryDistribution }) => {
  const data = {
    labels: ['1 Try', '2 Tries', '3 Tries', '4 Tries', '5 Tries', '6 Tries'],
    datasets: [
      {
        label: 'Number of Games',
        data: tryDistribution,
        backgroundColor: '#0f766e',
        borderColor: '#0a443f', 
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold">Try Distribution</h2>
      <div className="w-full lg:w-3/4">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default TryDistributionChart;
