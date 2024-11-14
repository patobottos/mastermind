"use client";

import React, { useEffect, useState } from "react";
import { useGameStore } from "@/utilities/store";
import Circle from "./Circle";
import { initialColorValues } from "./ColorButton";
import ColorButtonRow from "./ColorButtonRow";
import AnswerRow from "./AnswerRow";
import CheckButton from "./CheckButton";
import NewGameButton from "./NewGameButton";
import Lottie from "lottie-react";
import confetti from "@/app/assets/confetti.json";
//import FirebaseTest from "./FirebaseTest";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/utilities/firebaseConfig";

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
  const [isGuessComplete, setIsGuessComplete] = useState(false);
  const [gameStats, setGameStats] = useState({
    totalGames: 0,
    winPercentage: 0,
    averageTries: 0,
  });

  // Fetch game statistics when the game starts
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
          totalTries += data.tries || 0; // Sum the number of tries
          if (data.state === "won") totalWins += 1; // Count wins
        });

        const winPercentage =
          totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
        const averageTries =
          totalGames > 0 ? Math.round(totalTries / totalGames) : 0;

        setGameStats({
          totalGames,
          winPercentage,
          averageTries,
        });

        console.log(
          `Total games: ${totalGames}, Wins: ${totalWins}, Win Percentage: ${winPercentage}%, Average Tries: ${averageTries}`
        );
      } catch (error) {
        console.error("Error fetching game stats:", error);
      }
    };

    initializeGame();
    setIsInitialized(true);
    fetchGameStats();
  }, [initializeGame]);

  // Check if the guess is complete
  useEffect(() => {
    if (playerGuesses.length === 0) return;
    const currentGuess =
      playerGuesses[tryNumber - 1]?.guess || initialColorValues;
    const complete = currentGuess.every(
      (color) => color.color !== "transparent"
    );
    setIsGuessComplete(complete);
    console.log("Guess completeness updated:", complete);
  }, [playerGuesses, tryNumber]);

  useEffect(() => {
    // Reset isGuessComplete when tryNumber changes
    setIsGuessComplete(false);
  }, [tryNumber]);

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

  const handleCheckButtonClick = async () => {
    const currentGuess =
      playerGuesses[tryNumber - 1]?.guess || initialColorValues;
    if (currentGuess.some((color) => color.color === "transparent")) {
      alert("Please, pick a color for each circle and try again.");
      return;
    }
    evaluateGuess();
  };

  const handleNewGameClick = async () => {
    initializeGame();
    setIsGuessComplete(false); // Reset the guess completion state
  };

  const playersChances = [1, 2, 3, 4, 5, 6, 7, 8];

  // Save game result to Firebase when the game ends
  const saveGameResult = async (won: boolean, tries: number) => {
    try {
      const gameData = {
        date: new Date(),
        tries: tries,
        state: won ? "won" : "lost",
      };

      await addDoc(collection(db, "games"), gameData);
      console.log("Game result saved successfully!");
    } catch (error) {
      console.error("Error saving game result:", error);
    }
  };

  // Save result when the game ends
  useEffect(() => {
    if (gameState === "won" || gameState === "lost") {
      const won = gameState === "won";
      saveGameResult(won, tryNumber);
    }
  }, [gameState]);

  return (
    <div className="flex flex-col items-center relative text-light-text dark:text-dark-text">
      <div className="flex flex-col items-center justify-center mb-2">
        {/* ONLY FOR TESTING PURPOSES
        <p>Random Generated Code:</p>
        <div className="flex">
          {randomCode.map((CodePosition, index) => (
            <Circle key={index} size="large" color={CodePosition.color} />
          ))}
        </div>
        */
        }
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
      {gameState === "playing" && (
        <CheckButton
          onClick={handleCheckButtonClick}
          disabled={!isGuessComplete}
        />
      )}
      {/* THIS IS THE FINAL SCREEN */}
      {gameState !== "playing" && (
        <div className="absolute inset-0 flex flex-col justify-start items-center pt-12 px-5 text-slate-800 top-0 bg-teal-50 bg-opacity-90 border border-teal-700 rounded-md text-center left-0 right-0 mx-auto w-[346px] h-[520px] backdrop-blur-sm shadow-2xl shadow-teal-500/40">
          {/* CONFETTI ANIMATION FOR THE WINNERS!*/}
          {gameState === "won" && (
            <div className="flex flex-col items-center">
              <div className="absolute top-0 right-0 z-10 pointer-events-none">
                <Lottie
                  animationData={confetti}
                  loop={true}
                  autoplay={true}
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice",
                  }}
                />
              </div>
              <p className="text-pretty font-medium">
                Congratulations! You've won! It has taken you{" "}
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
                You've reached the maximum number of tries. You've lost. The
                answer code was:
              </p>
              <div className="flex mx-1">
                {randomCode.map((CodePosition, index) => (
                  <Circle key={index} size="large" color={CodePosition.color} />
                ))}
              </div>
              <p className="mx-1">Let's start a new game.</p>
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
