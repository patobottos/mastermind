import create from 'zustand';
import { getRandomColorCode, CodePosition } from './randomCodeGenerator';
import { computeGuess, GuessedColorState } from './gameLogic';

export const CODE_LENGTH = 5;
export const GUESS_CHANCES = 8;

type GuessRow = {
  guess: CodePosition[]; // Adjust the type to CodePosition[]
  result?: GuessedColorState[];
}

type StoreState = {
  answerCode: CodePosition[]; // Adjust the type to CodePosition[]
  guessRows: GuessRow[];
  gameState: 'playing' | 'won' | 'lost';
  addGuess: (guess: CodePosition[]) => void; // Adjust the type to CodePosition[]
  bears: number;
  increase: (by: number) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  answerCode: getRandomColorCode(),
  guessRows: [] as GuessRow[],
  gameState: 'playing',
  bears: 0,
  addGuess: (guess: CodePosition[]) => {
    // Your logic for adding a guess goes here
  },
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

