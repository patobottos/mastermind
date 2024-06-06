"use client";

import React, { useState, useEffect } from "react";
import {
  getRandomColorCode,
  CodePosition,
  AnswerCodeType,
} from "@/utilities/randomCodeGenerator";
import { initialColorValues, radioColorValues } from "./ColorButton";
import Circle from "./Circle";
import ColorButtonRow from "./ColorButtonRow";
import AnswerRow from "./AnswerRow";
import CheckButton from "./CheckButton";
import { evaluateGuess } from "@/utilities/evaluateGuess";

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
    setPlayerGuesses((prevGuesses) => {
      const currentPlayerGuess = prevGuesses[tryNumber - 1]?.guess || [];
      const updatedGuess = [...currentPlayerGuess];
      updatedGuess[position - 1] = { position: position, color: color };

      const newGuesses = [...prevGuesses];
      newGuesses[tryNumber - 1] = { tryNumber, guess: updatedGuess };

      return newGuesses;
    });
  };

  const handleCheckButtonClick = () => {
    const latestGuess = playerGuesses[tryNumber - 1]?.guess || [];
    const evaluation = evaluateGuess(latestGuess, randomCode);

    setEvaluations((prevEvaluations) => {
      const newEvaluations = [...prevEvaluations];
      newEvaluations[tryNumber - 1] = evaluation;
      return newEvaluations;
    });

    setTryNumber((prevTryNumber) => prevTryNumber + 1);
  };

  const playersChances = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="text-white w-[80vw] flex flex-col items-center justify-center m-auto">
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
          <div key={index} className="flex justify-center py-1 items-center">
            <div className="col-span-2 mr-4 xxs:mr-0 xs:mr-0 s:mr-1">
              <ColorButtonRow
                guessingCode={initialColorValues}
                size="large"
                onColorChange={(color, position) =>
                  handleColorChange(color, position)
                }
              />
            </div>
            <div className="col-span-1 border-2 border-yellow-200 ">
              <AnswerRow evaluation={evaluations[index]} />
            </div>
          </div>
        ))}
      </div>
      <CheckButton onClick={handleCheckButtonClick} />
    </div>
  );
}
