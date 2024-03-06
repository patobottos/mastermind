import create from 'zustand';
import { getRandomColorCode } from './randomCodeGenerator';
import { computeGuess, GuessedColorState } from './gameLogic';

export const CODE_LENGTH = 5;
export const GUESS_CHANCES = 8;

interface GuessRow {
  guess: string;
  result?: GuessedColorState[];
}

interface StoreState {
  answerCode: string[];
  guessRows: GuessRow[];
  gameState: 'playing' | 'won' | 'lost';
  addGuess: (guess: string[]) => void;
  bears: number;
  increase: (by: number) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  answerCode: getRandomColorCode(),
  guessRows: [] as GuessRow[],
  gameState: 'playing',
  bears: 0,
  addGuess: (guess: string[]) => {
    // Your logic for adding a guess goes here
  },
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
