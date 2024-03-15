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

export default function Board() {
  const [randomCode, setRandomCode] = useState<AnswerCodeType>([]);
  const [tryNumber, setTryNumber] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>(""); // Initialize with an empty string
  const [playerGuesses, setPlayerGuesses] = useState<Array<CodePosition[]>>([]);

  useEffect(() => {
    // Capture the current player's guess and update the state
    const currentPlayerGuess: CodePosition[] = initialColorValues.map(
      (_, index) => ({
        position: index + 1,
        color: selectedColor,
      })
    );

    setPlayerGuesses((prevGuesses) => [...prevGuesses, currentPlayerGuess]);

    // Log the current player's guess to the console
    console.log(`Try ${tryNumber}: Player's Guess =>`, currentPlayerGuess);
  }, [selectedColor, tryNumber]); // Update when selectedColor or tryNumber changes

  useEffect(() => {
    const generatedCode: AnswerCodeType = getRandomColorCode();
    setRandomCode(generatedCode);
    console.log("código respuesta: ", generatedCode);
  }, []);

  const handleColorChange = (color: string, position: number) => {
    // Update the try number when the player makes a guess
    setTryNumber((prevTryNumber) => prevTryNumber + 1);

    setSelectedColor(color);

    // Log the selected color and position
    console.log(
      `Try ${tryNumber}: Selected color => ${color} at position ${position}`
    );
  };

  const handleCheckButtonClick = () => {
    // Capture the current player's guess and update the state
    const currentPlayerGuess: CodePosition[] = initialColorValues.map(
      (_, index) => ({
        position: index + 1,
        color: selectedColor,
      })
    );

    setPlayerGuesses((prevGuesses) => [...prevGuesses, currentPlayerGuess]);

    // Log the current player's guess to the console
    console.log(`Try ${tryNumber}: Player's Guess =>`, currentPlayerGuess);
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
