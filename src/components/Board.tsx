"use client";

import React, { useEffect, useState } from "react";
import { useGameStore } from "@/utilities/store";
import Circle from "./Circle";
import { initialColorValues } from "./ColorButton";
import ColorButtonRow from "./ColorButtonRow";
import AnswerRow from "./AnswerRow";
import CheckButton from "./CheckButton";
import NewGameButton from "./NewGameButton";

export default function Board() {
  const {
    tryNumber,
    gameState,
    playerGuesses,
    evaluations,
    randomCode,
    initializeGame,
    makeGuess,
    evaluateGuess,
  } = useGameStore();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeGame();
    setIsInitialized(true);
  }, [initializeGame]);

  const handleColorChange = (color: string, position: number) => {
    makeGuess(position, color);
  };

  const handleCheckButtonClick = () => {
    const currentGuess =
      playerGuesses[tryNumber - 1]?.guess || initialColorValues;
    if (currentGuess.some((color) => color.color === "transparent")) {
      alert("Please, pick a color for each circle and try again.");
      return;
    }
    evaluateGuess();
  };

  const handleNewGameClick = () => {
    initializeGame();
  };

  const playersChances = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="text-white flex flex-col items-center relative">
      <div className="flex flex-col items-center justify-center">
        <p>Random Generated Code:</p>
        <div className="flex">
          {randomCode.map((CodePosition, index) => (
            <Circle key={index} size="large" color={CodePosition.color} />
          ))}
        </div>
      </div>

      {/* THESE ARE THE 8 ROWS CORRESPONDING TO THE 8 GUESS TRIES */}
      <div className="flex flex-col justify-center mx-20">
        {playersChances.map((_, index) => (
          <div key={index} className="flex justify-center py-1 items-center">
            <div className="col-span-1 mr-1 sm:mr-4">
              <ColorButtonRow
                key={`color-row-${index}-${tryNumber}`}
                guessingCode={playerGuesses[index]?.guess || initialColorValues}
                size="large"
                onColorChange={(color, position) =>
                  handleColorChange(color, position)
                }
                isEnabled={index + 1 === tryNumber && gameState === "playing"}
              />
            </div>
            <div className="col-span-1">
              <AnswerRow evaluation={evaluations[index]} />
            </div>
          </div>
        ))}
      </div>
      {gameState === "playing" && (
        <CheckButton onClick={handleCheckButtonClick} />
      )}
      {/* THIS IS THE FINAL SCREEN */}
      {gameState !== "playing" && (
        <div className="absolute inset-0 flex flex-col justify-start items-center pt-12 px-5 text-slate-800 top-0 bg-teal-50 bg-opacity-90 border border-teal-700 rounded-md text-center left-0 right-0 mx-auto w-[346px] h-[520px] backdrop-blur-sm shadow-2xl shadow-teal-500/40">
          {gameState === "won" && (
            <div className="flex flex-col items-center">
              <p className="text-pretty font-medium">
                Congratulations! You've won! It has taken you{" "}
                {tryNumber === 1
                  ? "just one try! The average is A NUMBER HERE."
                  : `${tryNumber} tries. The average is A NUMBER HERE.`}
              </p>
              <div className="flex mt-2">
                {randomCode.map((CodePosition, index) => (
                  <Circle key={index} size="large" color={CodePosition.color} />
                ))}
              </div>
              <div className="flex mt-40">
                <NewGameButton onClick={handleNewGameClick} />
              </div>
            </div>
          )}
          {gameState === "lost" && (
            <div className="flex flex-col items-center">
              <p>
                You've reached the maximum number of tries. You've lost. The
                answer code was:
              </p>
              <div className="flex">
                {randomCode.map((CodePosition, index) => (
                  <Circle key={index} size="large" color={CodePosition.color} />
                ))}
              </div>
              <div className="flex mt-40">
                <NewGameButton onClick={handleNewGameClick} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
