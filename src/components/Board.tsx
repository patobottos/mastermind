"use client";

import React, { useEffect, useState } from "react";
import { useGameStore } from "@/utilities/store";
import Circle from "./Circle";
import { initialColorValues } from "./ColorButton";
import ColorButtonRow from "./ColorButtonRow";
import AnswerRow from "./AnswerRow";
import CheckButton from "./CheckButton";
import NewGameButton from "./NewGameButton";
import dynamic from "next/dynamic";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/utilities/firebaseConfig";
import ErrorMessage from "./ErrorMessage";
import GameOverScreen from "./GameOverScreen";

// Dynamically import Confetti with SSR disabled to fix the "document is not defined" error
const Confetti = dynamic(() => import("./Confetti"), { ssr: false });

type GameStats = {
  totalGames: number;
  winPercentage: number;
  averageTries: number;
};

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
    setError,
  } = useGameStore();

  const [isInitialized, setIsInitialized] = useState(false);
  const [isGuessComplete, setIsGuessComplete] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    totalGames: 0,
    winPercentage: 0,
    averageTries: 0,
  });

  const playersChances = Array.from({ length: 8 }, (_, i) => i + 1);

  /**
   * Fetch game statistics when the game starts
   */
  useEffect(() => {
    const fetchGameStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));

        let totalGames = 0;
        let totalTries = 0;
        let totalWins = 0;

        querySnapshot.forEach((doc) => {
          totalGames += 1;
          const data = doc.data();
          totalTries += data.tries || 0;
          if (data.state === "won") totalWins += 1;
        });

        const winPercentage =
          totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
        const averageTries =
          totalGames > 0 ? Math.round(totalTries / totalGames) : 0;

        setGameStats({ totalGames, winPercentage, averageTries });
      } catch (error) {
        console.error("Error fetching game stats:", error);
        setError("Failed to fetch game statistics. Please try again.");
      }
    };

    if (!isInitialized) {
      initializeGame();
      setIsInitialized(true);
      fetchGameStats();
    }
  }, [initializeGame, isInitialized]);

  /**
   * Check if the current guess is complete
   */
  useEffect(() => {
    const currentGuess =
      playerGuesses[tryNumber - 1]?.guess || initialColorValues;
    const complete = currentGuess.every(
      (color) => color.color !== "transparent"
    );
    setIsGuessComplete(complete);
  }, [playerGuesses, tryNumber, setError]);

  /**
   * Save game result to Firebase when the game ends
   */
  useEffect(() => {
    const saveGameResult = async () => {
      try {
        const gameData = {
          date: new Date(),
          tries: tryNumber,
          state: gameState === "won" ? "won" : "lost",
        };

        await addDoc(collection(db, "games"), gameData);
        console.log("Game result saved successfully!");
      } catch (error) {
        console.error("Error saving game result:", error);
        setError("Failed to save game result. Please check your connection.");
      }
    };

    if (gameState === "won" || gameState === "lost") {
      saveGameResult();
    }
  }, [gameState, tryNumber, setError]);

  /**
   * Handle color change in the current guess row
   */
  const handleColorChange = (color: string, position: number) => {
    makeGuess(position, color);
    const currentGuess =
      playerGuesses[tryNumber - 1]?.guess || initialColorValues;
    const newGuess = currentGuess.map((g, index) =>
      index === position ? { ...g, color } : g
    );
    const complete = newGuess.every((color) => color.color !== "transparent");
    setIsGuessComplete(complete);
  };

  /**
   * Handle the "Check" button click
   */
  const handleCheckButtonClick = () => {
    const currentGuess =
      playerGuesses[tryNumber - 1]?.guess || initialColorValues;
    if (currentGuess.some((color) => color.color === "transparent")) {
      setError("Please, pick a color for each circle and try again.");
      return;
    }
    evaluateGuess();
  };

  /**
   * Start a new game
   */
  const handleNewGameClick = () => {
    initializeGame();
    setIsGuessComplete(false);
  };

  return (
    <div className="flex flex-col items-center relative text-light-text dark:text-dark-text">
      <ErrorMessage />
      <div className="flex flex-col items-center justify-center mb-2">
        {tryNumber <= 7 ? (
          <p>You have {9 - tryNumber} tries left. </p>
        ) : (
          <p>You have 1 try left. Come on!</p>
        )}
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

      {/* CHECK BUTTON */}
      {gameState === "playing" && (
        <CheckButton
          onClick={handleCheckButtonClick}
          disabled={!isGuessComplete}
        />
      )}

      {/* FINAL SCREEN */}
      {gameState !== "playing" && (
        <div className="absolute inset-0 flex flex-col justify-start items-center pt-12 px-5 text-slate-800 top-0 bg-teal-50 bg-opacity-90 border border-teal-700 rounded-md text-center left-0 right-0 mx-auto w-[346px] h-[520px] backdrop-blur-sm shadow-2xl shadow-teal-500/40">
          {/* CONFETTI ANIMATION FOR THE WINNERS!*/}
          {gameState === "won" && (
            <div className="flex flex-col items-center">
              <div className="absolute top-0 right-0 z-10 pointer-events-none">
               <Confetti/>
              </div>
              <p className="text-pretty font-medium">
                Congratulations! You&apos;ve won! It has taken you{" "}
                {tryNumber === 1
                  ? "just one try! The average is " + gameStats.averageTries
                  : `${tryNumber} tries. The average is ${gameStats.averageTries}.`}
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
            <div className="flex flex-col items-center ">
              <p className="mx-1">
                You&apos;ve reached the maximum number of tries. You&apos;ve lost. The
                answer code was:
              </p>
              <div className="flex mx-1">
                {randomCode.map((CodePosition, index) => (
                  <Circle key={index} size="large" color={CodePosition.color} />
                ))}
              </div>
              <p className="mx-1">Let&apos;s start a new game.</p>
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
