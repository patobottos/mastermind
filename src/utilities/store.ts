import { create } from "zustand";
import {
  PlayerGuess,
  AnswerCodeType,
  CodePosition,
} from "./randomCodeGenerator";
import { getRandomColorCode } from "./randomCodeGenerator";
import { evaluateGuess } from "./evaluateGuess";

type GameState = {
  tryNumber: number;
  gameState: "playing" | "won" | "lost";
  playerGuesses: PlayerGuess[];
  evaluations: string[][];
  randomCode: AnswerCodeType;
  initializeGame: () => void;
  makeGuess: (guess: CodePosition[]) => void;
  evaluateGuess: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  tryNumber: 1,
  gameState: "playing",
  playerGuesses: [],
  evaluations: Array.from({ length: 8 }, () => Array(5).fill("")),
  randomCode: [],
  initializeGame: () => {
    const generatedCode = getRandomColorCode();
    set({
      tryNumber: 1,
      gameState: "playing",
      playerGuesses: [],
      evaluations: Array.from({ length: 8 }, () => Array(5).fill("")),
      randomCode: generatedCode,
    });
  },
  makeGuess: (guess) =>
    set((state) => ({
      playerGuesses: [
        ...state.playerGuesses,
        { tryNumber: state.tryNumber, guess },
      ],
    })),
  evaluateGuess: () =>
    set((state) => {
      const latestGuess = state.playerGuesses[state.tryNumber - 1]?.guess || [];
      const evaluation = evaluateGuess(latestGuess, state.randomCode);

      const isCorrect = evaluation.every((color) => color === "black");

      return {
        evaluations: state.evaluations.map((evalRow, index) =>
          index === state.tryNumber - 1 ? evaluation : evalRow
        ),
        tryNumber: state.tryNumber + 1,
        gameState: isCorrect
          ? "won"
          : state.tryNumber >= 8
          ? "lost"
          : "playing",
      };
    }),
}));
