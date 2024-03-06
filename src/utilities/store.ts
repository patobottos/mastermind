import create from 'zustand';
import { getRandomColorCode } from './randomCodeGenerator';
import { computeGuess, GuessedColorState } from './gameLogic';

export const CODE_LENGTH = 5;
export const GUESS_CHANCES = 8;

export interface GuessRow {
  guess: string[];
  result?: GuessedColorState[];
}

interface StoreState {
  answerCode: string[];
  guessRows: GuessRow[];
  gameState: 'playing' | 'won' | 'lost';
  addGuess: (guess: string[]) => void;
  newGame(): void;
}

export const useStore = create<StoreState>((set, get) => {
  const addGuess = (guess: string[]) => {
    // Use the set function to access the current state
    set((state) => {
      const result = computeGuess(guess, state.answerCode);

      const didWin = result.every((i) => i === GuessedColorState.Match);

      const guessRows = [
        ...state.guessRows,
        {
          guess,
          result,
        },
      ];

      return {
        ...state,
        guessRows,
        gameState: didWin
          ? 'won'
          : guessRows.length === GUESS_CHANCES
            ? 'lost'
            : 'playing',
      };
    });
  };

  return {
    answerCode: getRandomColorCode(),
    guessRows: [] as GuessRow[],
    gameState: 'playing',
    addGuess,

    newGame: () => {
      set({
        answerCode: getRandomColorCode(),
        guessRows: [] as GuessRow[],
        gameState: 'playing',
      });
    },
  };
});
