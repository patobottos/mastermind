import create from 'zustand';
import getRandomCode from './randomCodeGenerator';
import { GuessedColorState } from '@/utilities/circleUtilities';

export const CODE_LENGTH = 5;
export const GUESS_CHANCES = 6;

interface GuessRow {
  guess: string;
  result?: GuessedColorState[];
}


interface StoreState {
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