const CircleColorVariants: { [key: string]: string } = {
  crimson: "bg-crimson",
  sunrise: "bg-sunrise",
  sunny: "bg-sunny",
  emerald: "bg-emerald",
  azure: "bg-azure",
  velvet: "bg-velvet",
  skyblue: "bg-skyblue",
  rosy: "bg-rosy",
};

export enum GuessedColorState {
  Miss = "Miss", // Color doesn't exist at all - TRANSPARENT
  Present = "Present", // Color exists but wrong location -  WHITE
  Match = "Match", // Color exists and is in the right location - BLACK
}

export const GuessedColorStateStyles = {
  [GuessedColorState.Miss]: "border-gray-600 bg-transparent",
  [GuessedColorState.Present]: "border-gray-600 bg-white",
  [GuessedColorState.Match]: "border-gray-600 bg-black",
};

export function computeGuess(
  guessingCode: string[],
  answerCode: string[]
): GuessedColorState[] {
  const results: GuessedColorState[] = new Array(guessingCode.length).fill(
    GuessedColorState.Miss
  );

  if (guessingCode.length !== answerCode.length) {
    return results;
  }

  const answerColorCount: Record<string, number> = {};
  answerCode.forEach((color) => {
    answerColorCount[color] = (answerColorCount[color] || 0) + 1;
  });

  // First pass: identify exact matches
  for (let i = 0; i < guessingCode.length; i++) {
    if (guessingCode[i] === answerCode[i]) {
      results[i] = GuessedColorState.Match;
      answerColorCount[guessingCode[i]]--;
    }
  }

  // Second pass: identify presents
  for (let i = 0; i < guessingCode.length; i++) {
    if (results[i] === GuessedColorState.Match) {
      continue;
    }

    if (
      answerColorCount[guessingCode[i]] > 0 &&
      answerCode.includes(guessingCode[i])
    ) {
      let present = false;
      for (let j = 0; j < answerCode.length; j++) {
        if (
          guessingCode[i] === answerCode[j] &&
          results[j] !== GuessedColorState.Match &&
          answerColorCount[guessingCode[i]] > 0
        ) {
          present = true;
          answerColorCount[guessingCode[i]]--;
          break;
        }
      }
      results[i] = present ? GuessedColorState.Present : GuessedColorState.Miss;
    } else {
      results[i] = GuessedColorState.Miss;
    }
  }

  return results;
}
