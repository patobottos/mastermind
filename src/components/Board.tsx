"use client";

import React, { useEffect } from "react";
import {
  getRandomColorCode,
  CodePosition,
} from "@/utilities/randomCodeGenerator";
import { useGameStore } from "@/utilities/store";
import Circle from "./Circle";
import { initialColorValues } from "./ColorButton";
import ColorButtonRow from "./ColorButtonRow";
import AnswerRow from "./AnswerRow";
import CheckButton from "./CheckButton";

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

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleColorChange = (color: string, position: number) => {
    const currentPlayerGuess = playerGuesses[tryNumber - 1]?.guess || [];
    const updatedGuess = [...currentPlayerGuess];
    updatedGuess[position - 1] = { position: position, color: color };
    makeGuess(updatedGuess);
  };

  const handleCheckButtonClick = () => {
    evaluateGuess();
  };

  const playersChances = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="text-white w-[80vw] flex flex-col items-center">
      <div className="flex flex-col items-center justify-center">
        <p>Random Generated Code:</p>
        <div className="flex">
          {randomCode.map((CodePosition, index) => (
            <Circle key={index} size="large" color={CodePosition.color} />
          ))}
        </div>
      </div>

      <h2>The board here:</h2>

      <div className="flex flex-col justify-center mx-20">
        {playersChances.map((_, index) => (
          <div key={index} className="flex justify-center py-1 items-center ">
            <div className="col-span-2 mr-5 xs:mr-3 s:mr-4">
              <ColorButtonRow
                guessingCode={initialColorValues}
                size="large"
                onColorChange={(color, position) =>
                  handleColorChange(color, position)
                }
              />
            </div>
            <div className="col-span-1">
              <AnswerRow evaluation={evaluations[index]} />
            </div>
          </div>
        ))}
      </div>
      <CheckButton onClick={handleCheckButtonClick} />
      {gameState !== "playing" && (
        <div>
          {gameState === "won"
            ? "Congratulations! You've won!"
            : "You've lost!"}
        </div>
      )}

      {/* WHEN GAME OVER, RANDOM CODE SHOULD DISPLAY, TOGETHER WITH NUMBER OF TRIES AND CONGRATULATIONS!! */}
      {tryNumber > 8 && (
        <div className="flex flex-col items-center justify-center">
          <p>Random Generated Code:</p>
          <div className="flex">
            {randomCode.map((CodePosition, index) => (
              <Circle key={index} size="large" color={CodePosition.color} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
