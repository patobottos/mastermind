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
  const [evaluations, setEvaluations] = useState<string[][]>([]);

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
    setEvaluations((prevEvaluations) => [...prevEvaluations, evaluation]);
    console.log("Evaluations:", evaluations);
  };

  const evaluateGuess = (guess: CodePosition[], answer: AnswerCodeType) => {
    const evaluation: string[] = [];
    const answerColors = answer.map((item) => item.color);
    const matchedIndices: number[] = []; // Keep track of matched indices in the random code

    guess.forEach((position, index) => {
      const colorIndex = answerColors.indexOf(position.color);

      if (
        position.color === answerColors[index] &&
        !matchedIndices.includes(index)
      ) {
        evaluation.push("match"); // Exact match, black circle
        matchedIndices.push(index); // Mark the matched index to avoid counting it again
      } else if (colorIndex !== -1 && !matchedIndices.includes(colorIndex)) {
        evaluation.push("present"); // Color present but not in the exact position, white circle
        matchedIndices.push(colorIndex); // Mark the matched index to avoid counting it again
      } else {
        evaluation.push("miss"); // Color not present, transparent circle
      }
    });

    // Fill the remaining positions with transparent
    const remaining = 5 - evaluation.length;
    for (let i = 0; i < remaining; i++) {
      evaluation.push("transparent");
    }

    console.log("Evaluation =>", evaluation);
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
      <div></div>

      <h2>The board here:</h2>
      <div className="border border-yellow-200 p-3 grid grid-cols-3 gap-4 items-end max-w-max">
        <div className="border-2 border-gray-600 rounded col-span-2">
          <h3>Left: The Guess</h3>
          <div className="border border-pink-300 flex flex-col items-center">
            {playersChances.map((item, index) => (
              <ColorButtonRow
                key={tryNumber}
                guessingCode={initialColorValues}
                size="large"
                onColorChange={(color, position) =>
                  handleColorChange(color, position)
                }
              />
            ))}
          </div>
        </div>
        <div className="border-2 border-gray-600 rounded col-span-1">
          <h3>Right: The Answers</h3>
          <div className="flex justify-start">
            <AnswerRow evaluation={evaluations[evaluations.length - 1] ?? []} />
          </div>
        </div>
        <CheckButton onClick={handleCheckButtonClick} />
      </div>
    </div>
  );
}
