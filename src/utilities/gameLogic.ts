import getRandomCode from "./randomCodeGenerator";

const CircleColorVariants: { [key: string]: string } = {
  crimson: "bg-crimson",
  sunrise: "bg-sunrise",
  sunny: "bg-sunny",
  emerald: "bg-emerald",
  azure: "bg-azure",
  velvet: "bg-velvet",
  skyblue: "bg-skyblue",
  rosy: "bg-rosy"
};

export enum GuessedColorState {
  Miss = "Miss", // Color doesn't exist at all - TRANSPARENT
  Present = "Present", // Color exists but wrong location -  WHITE
  Match = "Match", // Color exists and is in the right location - BLACK
}

export const GuessedColorStateStyles = {
  [GuessedColorState.Miss]: 'border-gray-600 bg-transparent',
  [GuessedColorState.Present]: 'border-gray-600 bg-white',
  [GuessedColorState.Match]: 'border-gray-600 bg-black',
};

export function computeGuess(
  guessingCode: string[],
  answerCode: string[]
): GuessedColorState[] {
  const CODE: string[] = getRandomCode().map((number) => CircleColorVariants[number]);

  // FIRST, WE CHECK FOR A FULL MATCH CASE
  if (guessingCode.every((val, index) => val === answerCode[index])) {
    return Array.from({ length: guessingCode.length }, () => GuessedColorState.Match);
  }

  const results: GuessedColorState[] = [];
  const answerColorCount: Record<string, number> = {};

  // IT RETURNS AN EMPTY ARRAY OF STATES WHEN WORDS HAVE DIFFERENT LENGTH
  if (guessingCode.length !== answerCode.length) {
    return results;
  }

  // IT COUNTS THE OCCURRENCES OF EACH COLOR IN THE ANSWER CODE
  answerCode.forEach(color => {
    answerColorCount[color] = (answerColorCount[color] || 0) + 1;
  });

  // FUNCTION TO CHECK THE COLOR EXISTS, AND IT'S IN THE RIGHT LOCATION (BLACK COLOR)
  function isMatch(guess: string, _answer: string, guessIndex: number): boolean {
    return answerColorCount[guess] > 0 && guessIndex === answerCode.indexOf(guess);
  }

  // FUNCTION TO CHECK THE COLOR EXISTS, BUT IS NOT IN THE RIGHT POSITION (WHITE COLOR)
  function isPresent(guess: string, _answer: string, guessIndex: number): boolean {
    return answerColorCount[guess] > 0 && guessIndex !== answerCode.indexOf(guess);
  }

  for (let i = 0; i < answerCode.length; i++) {
    if (isMatch(guessingCode[i], answerCode[i], i)) {
      results.push(GuessedColorState.Match);
      // Decrement the count to handle repeated letters
      answerColorCount[guessingCode[i]]--;
    } else if (isPresent(guessingCode[i], answerCode[i], i)) {
      results.push(GuessedColorState.Present);
      // Decrement the count to handle repeated letters
      answerColorCount[guessingCode[i]]--;
    } else {
      results.push(GuessedColorState.Miss);
    }
  }

  return results;
}

