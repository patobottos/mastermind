import { AnswerCodeType, CodePosition } from "@/utilities/randomCodeGenerator";

export const evaluateGuess = (
  guess: AnswerCodeType,
  answer: AnswerCodeType
): string[] => {
  const evaluation: string[] = [];
  const matchedIndices = new Set<number>();
  const colorCount = new Map<string, number>();

  // First pass to count colors in the answer
  for (const position of answer) {
    colorCount.set(position.color, (colorCount.get(position.color) || 0) + 1);
  }

  // First pass to find exact matches
  for (let i = 0; i < guess.length; i++) {
    if (guess[i].color === answer[i].color) {
      evaluation.push("match");
      matchedIndices.add(i);
      // Decrease the color count for exact matches
      colorCount.set(guess[i].color, colorCount.get(guess[i].color)! - 1);
    } else {
      evaluation.push(""); // Placeholder for non-match evaluations
    }
  }

  // Second pass to find present matches
  for (let i = 0; i < guess.length; i++) {
    if (!matchedIndices.has(i)) {
      if (colorCount.get(guess[i].color)! > 0) {
        evaluation[i] = "present";
        colorCount.set(guess[i].color, colorCount.get(guess[i].color)! - 1);
      } else {
        evaluation[i] = "miss";
      }
    }
  }

  // Replace any remaining placeholders with "miss"
  for (let i = 0; i < guess.length; i++) {
    if (evaluation[i] === "") {
      evaluation[i] = "miss";
    }
  }

  return evaluation;
};
