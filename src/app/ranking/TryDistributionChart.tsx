"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface TryDistributionChartProps {
  tryDistribution: number[];
}

const TryDistributionChart: React.FC<TryDistributionChartProps> = ({
  tryDistribution,
}) => {
  // Define color schemes for light and dark modes
  const lightModeColors = {
    backgroundColor: "#9CA3AF", // Light gray
    borderColor: "#6B7280", // Darker gray
  };

  const darkModeColors = {
    backgroundColor: "#4B5563", // Medium gray
    borderColor: "#1F2937", // Darker gray
  };

  // State to track whether dark mode is enabled
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Use `useEffect` to ensure this runs only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Choose color scheme based on dark mode
  const { backgroundColor, borderColor } = isDarkMode ? darkModeColors : lightModeColors;

  const data = {
    labels: ["1 Try", "2 Tries", "3 Tries", "4 Tries", "5 Tries", "6 Tries", "7 Tries", "8 Tries"],
    datasets: [
      {
        label: "Number of Games",
        data: tryDistribution,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable default aspect ratio for custom height
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full h-full min-h-[420px]">
      <h2 className="text-2xl font-semibold mb-4">Try Distribution</h2>
      <div className="w-full lg:w-[640px] h-[420px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TryDistributionChart;
