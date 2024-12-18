"use client";
import Confetti from "./Confetti";
import Circle from "./Circle";
import NewGameButton from "./NewGameButton";
import React, { ComponentType } from "react";

type GameStats = {
  totalGames: number;
  winPercentage: number;
  averageTries: number;
};

type AnswerCodeType = {
  color: string;
}[];

interface GameOverScreenProps {
  gameState: "won" | "lost";
  tryNumber: number;
  gameStats: GameStats;
  randomCode: AnswerCodeType;
  handleNewGameClick: () => void;
  Confetti: ComponentType<{}>; // Correctly type the Confetti component
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  gameState,
  tryNumber,
  gameStats,
  randomCode,
  handleNewGameClick,
  Confetti,
}) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-start items-center pt-12 px-5 text-slate-800 top-0 bg-teal-50 bg-opacity-90 border border-teal-700 rounded-md text-center left-0 right-0 mx-auto w-[346px] h-[520px] backdrop-blur-sm shadow-2xl shadow-teal-500/40">
      {gameState === "won" && (
        <div className="flex flex-col items-center">
          <div className="absolute top-0 right-0 z-10 pointer-events-none">
            <Confetti />
          </div>
          <p className="text-pretty font-medium">
            Congratulations! You've won! It has taken you{" "}
            {tryNumber === 1
              ? `just one try! The average is ${gameStats.averageTries}`
              : `${tryNumber} tries. The average is ${gameStats.averageTries}.`}
          </p>
          <div className="flex mt-2">
            {randomCode.map((CodePosition, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: CodePosition.color }}
              />
            ))}
          </div>
          <div className="flex mt-40">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleNewGameClick}
            >
              New Game
            </button>
          </div>
        </div>
      )}
      {gameState === "lost" && (
        <div className="flex flex-col items-center">
          <p className="mx-1">
            You've reached the maximum number of tries. You've lost. The answer
            code was:
          </p>
          <div className="flex mx-1">
            {randomCode.map((CodePosition, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: CodePosition.color }}
              />
            ))}
          </div>
          <p className="mx-1">Let's start a new game.</p>
          <div className="flex mt-40">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleNewGameClick}
            >
              New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameOverScreen;

