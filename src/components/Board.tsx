"use client";

import React, { useState, useEffect } from "react";
import {
  getRandomColorCode,
  CodePosition,
  AnswerCodeType,
} from "@/utilities/randomCodeGenerator";
import { initialColorValues } from "./ColorButton";
import Circle from "./Circle";
import ColorButtonRow from "./ColorButtonRow";
import AnswerRow from "./AnswerRow";
import CheckButton from "./CheckButton";
import { GUESS_CHANCES } from "@/utilities/store";

type PlayerGuess = {
  tryNumber: number;
  guess: CodePosition[];
};

export default function Board() {
  const [randomCode, setRandomCode] = useState<AnswerCodeType>([]);
  const [tryNumber, setTryNumber] = useState<number>(1);
  const [playerGuesses, setPlayerGuesses] = useState<PlayerGuess[]>([]);
  const [evaluations, setEvaluations] = useState<string[][]>(
    Array.from({ length: 8 }, () => Array(5).fill("")) // Initialize with 8 empty arrays, each containing 5 empty strings
  );

  useEffect(() => {
    const generatedCode: AnswerCodeType = getRandomColorCode();
    setRandomCode(generatedCode);
    console.log("Generated Code:", generatedCode);
  }, []);

  const handleColorChange = (color: string, position: number) => {
    const currentPlayerGuess: CodePosition[] =
      playerGuesses.length > 0
        ? [...playerGuesses[playerGuesses.length - 1].guess]
        : [];
    const updatedGuess = [...currentPlayerGuess];
    updatedGuess[position - 1] = { position: position, color: color };
    setPlayerGuesses((prevGuesses) => [
      ...prevGuesses.slice(0, prevGuesses.length - 1),
      {
        tryNumber: tryNumber,
        guess: updatedGuess,
      },
    ]);
  };

  const handleCheckButtonClick = () => {
    const latestGuess = playerGuesses[playerGuesses.length - 1]?.guess || [];
    const newGuess: PlayerGuess = {
      tryNumber: tryNumber,
      guess: latestGuess,
    };
    console.log("Player's Guess:", newGuess);

    setPlayerGuesses((prevGuesses) => [...prevGuesses, newGuess]);

    console.log("L59 latestGuess", latestGuess);
    console.log("L60 randomCode", randomCode);

    const evaluation = evaluateGuess(latestGuess, randomCode);
    setEvaluations((prevEvaluations) => [
      ...prevEvaluations.slice(0, -1),
      evaluation,
    ]);
    console.log("Evaluations:", evaluations);
  };

  //EVALUATE GUESS FUNCTION UNDER CONSTRUCTION
  const evaluateGuess = (guess: AnswerCodeType, answer: AnswerCodeType) => {
    const evaluation: string[] = [];

    const theGuessArray = guess;
    console.log("the guess array", theGuessArray);
    const theAnswerArray = answer;
    console.log("the answer array", theAnswerArray);

    for (let i = 0; i < guess.length; i++) {
      const guessColor = guess[i].color;
      const answerColor = answer[i].color;

      if (guessColor === answerColor) {
        evaluation[i] = "match";
        //theAnswerArray.splice(i);
      } else {
        const answerColors = theAnswerArray.map((item) => item.color);
        if (!answerColors.includes(guessColor)) {
          evaluation[i] = "miss";
        } else {
          evaluation[i] = "present";
        }
      }
    }

    return evaluation;
  };

  console.log("Player Guesses L99", playerGuesses);
  const playersChances = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="text-white w-[80vw] flex flex-col items-center justify-center">
      <div>
        <p>Random Generated Code:</p>
        <div className="flex">
          {randomCode.map((CodePosition, index) => (
            <Circle key={index} size="large" color={CodePosition.color} />
          ))}
        </div>
      </div>

      <h2>The board here:</h2>

      <div className="border-4 border-pink-400 flex flex-col justify-center sm:px-10 my-2">
        {playersChances.map((item, index) => (
          <div
            key={tryNumber}
            className="border-2 border-yellow-200 flex justify-center py-1 items-center"
          >
            <div className="col-span-2 mr-2 sm:mr-4">
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
    </div>
  );
}
