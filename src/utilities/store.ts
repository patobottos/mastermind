import create from 'zustand';
import getRandomCode from './randomCodeGenerator';
import { computeGuess, GuessedColorState } from './gameLogic';

export const CODE_LENGTH = 5;
export const GUESS_CHANCES = 8;

interface GuessRow {
  guess: number;
  result?: GuessedColorState[];
}


interface StoreState {
  answerCode: number[];
  guessRows: GuessRow[];
  gameState: 'playing' | 'won' | 'lost';
  addGuess: (guess: number[]) => void;


  bears: number
  increase: (by: number) => void
}

export const useStore = create<StoreState>()(
  (set, get) => ({
    const addGuess = (guess: number[]) => { };

    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
  })

  return {
  answerCode: getRandomCode(),
  guessRows: [] as GuessRow[],
  gameSate: 'playing',
  addGuess,

  newGame: ()


}
  
  
  
  )