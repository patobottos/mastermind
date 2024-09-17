import { create } from "zustand";
import {
  PlayerGuess,
  AnswerCodeType,
  getRandomColorCode,
} from "./randomCodeGenerator";
import { evaluateGuess } from "./evaluateGuess";

type GameState = {
  tryNumber: number;
  gameState: "playing" | "won" | "lost";
  playerGuesses: PlayerGuess[];
  evaluations: string[][];
  randomCode: AnswerCodeType;
  initializeGame: () => void;
  makeGuess: (position: number, color: string) => void;
  evaluateGuess: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  tryNumber: 1,
  gameState: "playing",
  playerGuesses: [],
  evaluations: Array.from({ length: 8 }, () => Array(5).fill("")),
  randomCode: [],

  initializeGame: () => {
    const generatedCode = getRandomColorCode();
    console.log("Initializing game with new random code:", generatedCode);
    set({
      tryNumber: 1,
      gameState: "playing",
      playerGuesses: [],
      evaluations: Array.from({ length: 8 }, () => Array(5).fill("")),
      randomCode: generatedCode,
    });

    // Log the state after setting it
    console.log("State after initialization:", {
      tryNumber: 1,
      gameState: "playing",
      playerGuesses: [],
      evaluations: Array.from({ length: 8 }, () => Array(5).fill("")),
      randomCode: generatedCode,
    });
  },

  makeGuess: (position, color) =>
    set((state) => {
      const currentTry = state.tryNumber - 1;
      const currentGuess =
        state.playerGuesses[currentTry]?.guess ||
        Array(5).fill({ position: 0, color: "transparent" });

      const updatedGuess = [...currentGuess];
      updatedGuess[position - 1] = { position, color };

      const newGuesses = [...state.playerGuesses];
      newGuesses[currentTry] = {
        tryNumber: state.tryNumber,
        guess: updatedGuess,
      };

      return {
        playerGuesses: newGuesses,
      };
    }),

  evaluateGuess: () =>
    set((state) => {
      const currentTry = state.tryNumber - 1;
      const latestGuess = state.playerGuesses[currentTry]?.guess || [];
      const evaluation = evaluateGuess(latestGuess, state.randomCode);
      const isCorrect = evaluation.every((answer) => answer === "match");
      const newEvaluations = [...state.evaluations];
      newEvaluations[currentTry] = evaluation;

      return {
        evaluations: newEvaluations,
        tryNumber: isCorrect ? state.tryNumber : state.tryNumber + 1,
        gameState: isCorrect ? "won" : state.tryNumber < 8 ? "playing" : "lost",
      };
    }),
}));
