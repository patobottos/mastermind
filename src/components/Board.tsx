"use client"; // This is a client component

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  CODE_LENGTH,
  GUESS_CHANCES,
  useStore,
  GuessRow,
} from "../utilities/store";
import { getRandomColorCode } from "@/utilities/randomCodeGenerator";
import { initialColorValues } from "./ColorButton";
import Circle from "./Circle";
import ColorButtonRow from "./ColorButtonRow";
import AnswerRow from "./AnswerRow";
import CheckButton from "./CheckButton";

export default function Board() {
  const state = useStore();
  const [guess, setGuess, addGuessColor] = useGuess();

  useEffect(() => {
    // Generate a random code when the component mounts
    if (!state.answerCode) {
      const randomCode = getRandomColorCode();
      useStore.setState({ answerCode: randomCode });
    }

    // Clean up code when the game ends
    return () => {
      if (state.answerCode && state.answerCode.length > 0) {
        useStore.setState({ answerCode: [] });
      }
    };
  }, [state.answerCode]);

  // Clean up code when the component unmounts
  useEffect(() => {
    return () => {
      useStore.setState({ answerCode: [] });
    };
  }, []);

  useEffect(() => {
    setGuess([]); // Use an empty array instead of an empty string
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === CODE_LENGTH) {
      addGuess(previousGuess);
    } else {
      setGuess(previousGuess || []); // Use an empty array if previousGuess is undefined
    }
  }, [guess, previousGuess, addGuess, setGuess]);

  let rows: GuessRow[] = [...state.guessRows];

  let currentRow = 0;

  if (rows.length < GUESS_CHANCES) {
    currentRow = rows.push({ guess }) - 1;
  }

  const guessesRemaining = GUESS_CHANCES - rows.length;

  rows = rows.concat(Array(guessesRemaining).fill(""));

  // FROM THIS LINE, OLD CODE

  const CodeInColors: string[] = state.answerCode || [];

  const [selectedColor, setSelectedColor] = useState<string>("crimsom");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    console.log("seleccionado color =>", color);
  };
  // AND FROM THIS LINE, THE BOARD COMPONENT
  return (
    <div className="text-white w-[80vw] flex flex-col items-center justify-center">
      <div>
        <p>Random Generated Code:</p>
        <div className="flex">
          {CodeInColors.map((color, index) => (
            <Circle key={index} size="large" color={color} />
          ))}
        </div>
      </div>

      <h2>The board here:</h2>
      <div className="border border-yellow-200 p-3 grid grid-cols-3 gap-4 items-end max-w-max">
        <div className="border-2 border-gray-600 rounded col-span-2">
          <h3>Left: The Guess</h3>
          <div className="border border-pink-300 flex justify-end">
            <ColorButtonRow guessingCode={initialColorValues} size="large" />
          </div>
        </div>
        <div className="border-2 border-gray-600 rounded col-span-1">
          <h3>Right: The Answers</h3>
          <div className="flex justify-start">
            <AnswerRow guessingCode={initialColorValues} />
          </div>
        </div>
        <CheckButton />
      </div>
    </div>
  );
}

function useGuess(): [
  string[],
  React.Dispatch<React.SetStateAction<string[]>>,
  (letter: string) => void
] {
  const [guess, setGuess] = useState<string[]>([]);

  const addGuessColor = useCallback((letter: string) => {
    setGuess((currentGuess) => {
      const newGuess = [...currentGuess, letter];
      return newGuess;
    });
  }, []);

  return [guess, setGuess, addGuessColor];
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
