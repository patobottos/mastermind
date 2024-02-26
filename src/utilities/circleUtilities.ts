export enum GuessedColorState {
  Miss, // Color doesn't exist at all - TRANSPARENT
  Present, // Color exists but wrong location -  WHITE
  Match, // Color exists and is in the right location - BLACK
}

export const GuessedColorStateStyles = {
  [GuessedColorState.Miss]: ' bg-gray-400',
  [GuessedColorState.Present]: 'border-white bg-white',
  [GuessedColorState.Match]: 'border-black bg-black',
};

