import { useGameStore } from "../utilities/store";

describe("Game Store", () => {
  beforeEach(() => {
    useGameStore.getState().initializeGame();
  });

  test("initial state is correct", () => {
    const state = useGameStore.getState();
    expect(state.tryNumber).toBe(1);
    expect(state.gameState).toBe("playing");
    expect(state.playerGuesses).toHaveLength(0);
    expect(state.randomCode).toHaveLength(5); // Assuming a 5-color code
    expect(state.isCorrect).toBe(false);
  });

  test("makeGuess updates playerGuesses correctly", () => {
    const { makeGuess, playerGuesses } = useGameStore.getState();
  
    // Make a guess
    makeGuess(1, "red");
  
    // Ensure playerGuesses is initialized and updated
    const updatedGuesses = useGameStore.getState().playerGuesses[0]?.guess;
    expect(updatedGuesses).toEqual([
      { position: 1, color: "red" },
      { position: 0, color: "transparent" },
      { position: 0, color: "transparent" },
      { position: 0, color: "transparent" },
      { position: 0, color: "transparent" },
    ]);
  });
  

  test("evaluateGuess sets gameState to 'won' if guess is correct", () => {
    const { randomCode, makeGuess, evaluateGuess } = useGameStore.getState();

    // Simulate a correct guess
    randomCode.forEach(({ color }, index) => makeGuess(index + 1, color)); // Extract `color` property
    evaluateGuess();

    expect(useGameStore.getState().gameState).toBe("won");
    expect(useGameStore.getState().isCorrect).toBe(true);
  });

  test("evaluateGuess increments tryNumber for incorrect guess", () => {
    const { makeGuess, evaluateGuess } = useGameStore.getState();

    // Simulate an incorrect guess
    makeGuess(1, "red");
    makeGuess(2, "blue");
    makeGuess(3, "green");
    makeGuess(4, "yellow");
    makeGuess(5, "purple");
    evaluateGuess();

    expect(useGameStore.getState().tryNumber).toBe(2);
    expect(useGameStore.getState().gameState).toBe("playing");
  });
});
