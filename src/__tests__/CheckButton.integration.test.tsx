import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, Mock } from "vitest";
import { useGameStore } from "../utilities/store"; // Adjust path if needed
import CheckButton from "../components/CheckButton";

// Mock Zustand store
vi.mock("../utilities/store", () => {
  return {
    useGameStore: vi.fn(),
  };
});

describe("CheckButton Integration Test", () => {
  let mockInitializeGame: Mock;
  let mockEvaluateGuess: Mock;

  beforeEach(() => {
    mockInitializeGame = vi.fn();
    mockEvaluateGuess = vi.fn();

    // Mock Zustand store behavior
    (useGameStore as unknown as Mock).mockReturnValue({
      initializeGame: mockInitializeGame,
      evaluateGuess: mockEvaluateGuess,
      gameState: "playing",
      tryNumber: 1,
      playerGuesses: [],
      evaluations: [],
      randomCode: ["red", "green", "blue", "yellow"],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls evaluateGuess when CheckButton is clicked", () => {
    render(<CheckButton onClick={mockEvaluateGuess} disabled={false} />);
    const button = screen.getByRole("button", { name: /check/i });

    fireEvent.click(button);

    expect(mockEvaluateGuess).toHaveBeenCalledTimes(1);
  });

  it("does not call evaluateGuess when the button is disabled", () => {
    render(<CheckButton onClick={mockEvaluateGuess} disabled={true} />);
    const button = screen.getByRole("button", { name: /check/i });

    fireEvent.click(button);

    expect(mockEvaluateGuess).not.toHaveBeenCalled();
  });

  it("renders button with proper styling when disabled", () => {
    render(<CheckButton onClick={mockEvaluateGuess} disabled={true} />);
    const button = screen.getByRole("button", { name: /check/i });

    expect(button).toHaveClass("opacity-50");
    expect(button).toHaveAttribute("disabled");
  });

  it("renders button with proper styling when enabled", () => {
    render(<CheckButton onClick={mockEvaluateGuess} disabled={false} />);
    const button = screen.getByRole("button", { name: /check/i });

    expect(button).not.toHaveClass("opacity-50");
    expect(button).not.toHaveAttribute("disabled");
  });
});
