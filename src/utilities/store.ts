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
  playerGuesses: PlayerGuess[]; // Array of player guesses
  evaluations: string[][]; // Feedback for each guess
  randomCode: AnswerCodeType; // Target code to guess
  isCorrect: boolean; // Derived state: true if the player guessed correctly
  initializeGame: () => void;
  makeGuess: (position: number, color: string) => void;
  evaluateGuess: () => void;
  errorMessage: string | null; // Property for error message
  setError: (message: string) => void; // Method to set an error
  clearError: () => void; // Method to clear an error
};

export const useGameStore = create<GameState>((set, get) => ({
  tryNumber: 1,
  gameState: "playing",
  playerGuesses: [],
  evaluations: Array.from({ length: 8 }, () => Array(5).fill("")),
  randomCode: [],
  isCorrect: false, // Initialize derived state
  errorMessage: null, // Initial state
  setError: (message: string) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: null }),

  initializeGame: () => {
    const generatedCode = getRandomColorCode();
    set({
      tryNumber: 1,
      gameState: "playing",
      playerGuesses: [],
      evaluations: Array.from({ length: 8 }, () => Array(5).fill("")),
      randomCode: generatedCode,
      isCorrect: false, // Reset derived state
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

      const newPlayerGuesses = [...state.playerGuesses];
      if (!isCorrect && state.tryNumber < 8) {
        // Add a new empty guess for the next try
        newPlayerGuesses.push({
          tryNumber: state.tryNumber + 1,
          guess: Array(5).fill({ position: 0, color: "transparent" }),
        });
      }

      return {
        evaluations: newEvaluations,
        playerGuesses: newPlayerGuesses,
        tryNumber: isCorrect ? state.tryNumber : state.tryNumber + 1,
        gameState: isCorrect ? "won" : state.tryNumber < 8 ? "playing" : "lost",
        isCorrect,
      };
    }),
}));
