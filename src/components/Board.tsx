"use client"; // This is a client component

import React, { useState, useEffect } from "react";
import {
  AnswerCodeType,
  getRandomColorCode,
} from "@/utilities/randomCodeGenerator";
import { initialColorValues } from "./ColorButton";
import Circle from "./Circle";
import ColorButtonRow from "./ColorButtonRow";
import AnswerRow from "./AnswerRow";
import CheckButton from "./CheckButton";
import { CodePosition } from "../utilities/randomCodeGenerator";

type PlayerGuess = {
  tryNumber: number;
  guess: CodePosition[];
};

export default function Board() {
  const [randomCode, setRandomCode] = useState<AnswerCodeType>([]);
  const [tryNumber, setTryNumber] = useState<number>(1);
  const [playerGuesses, setPlayerGuesses] = useState<PlayerGuess[]>([]);

  useEffect(() => {
    const generatedCode: AnswerCodeType = getRandomColorCode();
    setRandomCode(generatedCode);
    console.log("código respuesta: ", generatedCode);
  }, []);

  const handleColorChange = (color: string, position: number) => {
    // Construct the current player's guess
    const currentPlayerGuess: CodePosition[] =
      playerGuesses.length > 0
        ? [...playerGuesses[playerGuesses.length - 1].guess]
        : [];

    // Create a copy of the current player's guess
    const updatedGuess = [...currentPlayerGuess];

    // Update the color for the selected position
    updatedGuess[position - 1] = { position: position, color: color };

    // Update the state with the player's guess
    setPlayerGuesses((prevGuesses) => [
      ...prevGuesses.slice(0, prevGuesses.length - 1), // Remove the last guess
      {
        tryNumber: tryNumber,
        guess: updatedGuess,
      },
    ]);
  };

  const handleCheckButtonClick = () => {
    // Retrieve the latest guess made by the user from playerGuesses
    const latestGuess = playerGuesses[playerGuesses.length - 1]?.guess || [];

    // Construct the new player guess
    const newGuess: PlayerGuess = {
      tryNumber: tryNumber,
      guess: latestGuess,
    };

    // Log the player's guess to the console
    console.log("Player's Guess:", newGuess);

    // Update the state with the player's guess
    setPlayerGuesses((prevGuesses) => [...prevGuesses, newGuess]);
  };

  return (
    <div className='text-white w-[80vw] flex flex-col items-center justify-center'>
      <div>
        <p>Random Generated Code:</p>
        <div className='flex'>
          {randomCode.map((CodePosition, index) => (
            <Circle key={index} size='large' color={CodePosition.color} />
          ))}
        </div>
      </div>
      <div></div>

      <h2>The board here:</h2>
      <div className='border border-yellow-200 p-3 grid grid-cols-3 gap-4 items-end max-w-max'>
        <div className='border-2 border-gray-600 rounded col-span-2'>
          <h3>Left: The Guess</h3>
          <div className='border border-pink-300 flex justify-end'>
            <ColorButtonRow
              guessingCode={initialColorValues}
              size='large'
              onColorChange={(color, position) =>
                handleColorChange(color, position)
              }
            />
          </div>
        </div>
        <div className='border-2 border-gray-600 rounded col-span-1'>
          <h3>Right: The Answers</h3>
          <div className='flex justify-start'>
            <AnswerRow guessingCode={initialColorValues} />
          </div>
        </div>
        <CheckButton onClick={handleCheckButtonClick} />
      </div>
    </div>
  );
}
