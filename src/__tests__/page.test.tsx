import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, test } from "vitest";
import Home from "@/app/page";
import { evaluateGuess } from "@/utilities/evaluateGuess";
import { AnswerCodeType } from "@/utilities/randomCodeGenerator";

// TESTING HOME INTERFACE
describe("Home", () => {
  it('should display the word "Random" on the home page', () => {
    render(<Home />);
    const randomText = screen.getByText(/Random/i);
    expect(randomText).toBeInTheDocument();
  });
});

// TESTING EVALUATEGUESS FUNCTION
/// FULL MATCH
test("evaluateGuess function should give a full match when guess equals the answer", () => {
  const latestGuess: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "sunrise" },
    { position: 3, color: "sunny" },
    { position: 4, color: "emerald" },
    { position: 5, color: "azure" },
  ];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "sunrise" },
    { position: 3, color: "sunny" },
    { position: 4, color: "emerald" },
    { position: 5, color: "azure" },
  ];

  const expectedEvaluation: string[] = [
    "match",
    "match",
    "match",
    "match",
    "match",
  ];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});

/// FULL MISS
test("evaluateGuess function should give a full miss when guess does not contain any color of the answer at all", () => {
  const latestGuess: AnswerCodeType = [
    { position: 1, color: "velvet" },
    { position: 2, color: "skyblue" },
    { position: 3, color: "rosy" },
    { position: 4, color: "velvet" },
    { position: 5, color: "skyblue" },
  ];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "sunrise" },
    { position: 3, color: "sunny" },
    { position: 4, color: "emerald" },
    { position: 5, color: "azure" },
  ];

  const expectedEvaluation: string[] = ["miss", "miss", "miss", "miss", "miss"];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});

/// FULL PRESENT
test("evaluateGuess function should give a full present when all guess colors are present in the answer, but in the wrong position", () => {
  const latestGuess: AnswerCodeType = [
    { position: 1, color: "emerald" },
    { position: 2, color: "azure" },
    { position: 3, color: "sunrise" },
    { position: 4, color: "sunny" },
    { position: 5, color: "crimson" },
  ];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "sunrise" },
    { position: 3, color: "sunny" },
    { position: 4, color: "emerald" },
    { position: 5, color: "azure" },
  ];

  const expectedEvaluation: string[] = [
    "present",
    "present",
    "present",
    "present",
    "present",
  ];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});

/// NUMBER OF PRESENTS IS EQUAL OR LESS THAN COLOR QUANTITY IN THE ANSWER
test("evaluateGuess function should give a full present when all guess colors are present in the answer, but in the wrong position", () => {
  const latestGuess: AnswerCodeType = [
    { position: 1, color: "rosy" },
    { position: 2, color: "rosy" },
    { position: 3, color: "rosy" },
    { position: 4, color: "emerald" },
    { position: 5, color: "velvet" },
  ];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "sunrise" },
    { position: 3, color: "sunny" },
    { position: 4, color: "rosy" },
    { position: 5, color: "rosy" },
  ];

  const expectedEvaluation: string[] = [
    "present",
    "present",
    "miss",
    "miss",
    "miss",
  ];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});

/// NO PRESENTS WHEN THEY ARE ALREADY A MATCH CASE
test("evaluateGuess function should give a full present when all guess colors are present in the answer, but in the wrong position", () => {
  const latestGuess: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "crimson" },
    { position: 3, color: "crimson" },
    { position: 4, color: "velvet" },
    { position: 5, color: "skyblue" },
  ];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "crimson" },
    { position: 3, color: "sunny" },
    { position: 4, color: "emerald" },
    { position: 5, color: "sunny" },
  ];

  const expectedEvaluation: string[] = [
    "match",
    "match",
    "miss",
    "miss",
    "miss",
  ];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});

/// MIXED MATCHES AND MISSES
test("evaluateGuess function should handle mixed matches and misses", () => {
  const latestGuess: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "emerald" },
    { position: 3, color: "azure" },
    { position: 4, color: "velvet" },
    { position: 5, color: "rosy" },
  ];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "azure" },
    { position: 3, color: "sunrise" },
    { position: 4, color: "emerald" },
    { position: 5, color: "sunny" },
  ];

  const expectedEvaluation: string[] = [
    "match",
    "present",
    "present",
    "miss",
    "miss",
  ];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});

/// DUPLICATES IN GUESS BUT NOT IN ANSWER
test("evaluateGuess function should handle duplicates in guess but not in answer", () => {
  const latestGuess: AnswerCodeType = [
    { position: 1, color: "sunny" },
    { position: 2, color: "sunny" },
    { position: 3, color: "rosy" },
    { position: 4, color: "azure" },
    { position: 5, color: "velvet" },
  ];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "sunny" },
    { position: 2, color: "emerald" },
    { position: 3, color: "sunrise" },
    { position: 4, color: "rosy" },
    { position: 5, color: "crimson" },
  ];

  const expectedEvaluation: string[] = [
    "match",
    "miss",
    "present",
    "miss",
    "miss",
  ];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});

/// DUPLICATES IN BOTH GUESS AND ANSWER
test("evaluateGuess function should handle duplicates in both guess and answer", () => {
  const latestGuess: AnswerCodeType = [
    { position: 1, color: "sunny" },
    { position: 2, color: "sunny" },
    { position: 3, color: "rosy" },
    { position: 4, color: "rosy" },
    { position: 5, color: "velvet" },
  ];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "sunny" },
    { position: 2, color: "rosy" },
    { position: 3, color: "rosy" },
    { position: 4, color: "sunny" },
    { position: 5, color: "crimson" },
  ];

  const expectedEvaluation: string[] = [
    "match",
    "present",
    "match",
    "present",
    "miss",
  ];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});

/// ALL MATCHES WITH ONE COLOR
test("evaluateGuess function should handle all matches with one color", () => {
  const latestGuess: AnswerCodeType = [
    { position: 1, color: "sunny" },
    { position: 2, color: "sunny" },
    { position: 3, color: "sunny" },
    { position: 4, color: "sunny" },
    { position: 5, color: "sunny" },
  ];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "sunny" },
    { position: 2, color: "sunny" },
    { position: 3, color: "sunny" },
    { position: 4, color: "sunny" },
    { position: 5, color: "sunny" },
  ];

  const expectedEvaluation: string[] = [
    "match",
    "match",
    "match",
    "match",
    "match",
  ];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});

/// SINGLE COLOR MATCH
test("evaluateGuess function should handle single color match", () => {
  const latestGuess: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "velvet" },
    { position: 3, color: "rosy" },
    { position: 4, color: "sunny" },
    { position: 5, color: "sunrise" },
  ];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "emerald" },
    { position: 2, color: "sunrise" },
    { position: 3, color: "sunny" },
    { position: 4, color: "rosy" },
    { position: 5, color: "velvet" },
  ];

  const expectedEvaluation: string[] = [
    "miss",
    "present",
    "present",
    "present",
    "present",
  ];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});

/// PARTIAL MATCHES AND MISSES
test("evaluateGuess function should handle partial matches and misses", () => {
  const latestGuess: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "rosy" },
    { position: 3, color: "velvet" },
    { position: 4, color: "sunny" },
    { position: 5, color: "emerald" },
  ];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "crimson" },
    { position: 2, color: "emerald" },
    { position: 3, color: "azure" },
    { position: 4, color: "rosy" },
    { position: 5, color: "sunrise" },
  ];

  const expectedEvaluation: string[] = [
    "match",
    "present",
    "miss",
    "miss",
    "present",
  ];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});

// EDGE CASE WITH AN EMPTY GUESS, WITH NO COLORS
test("evaluateGuess function should handle an empty guess", () => {
  const latestGuess: AnswerCodeType = [];

  const randomCode: AnswerCodeType = [
    { position: 1, color: "sunny" },
    { position: 2, color: "sunny" },
    { position: 3, color: "sunny" },
    { position: 4, color: "sunny" },
    { position: 5, color: "sunny" },
  ];

  const expectedEvaluation: string[] = [];

  const evaluation = evaluateGuess(latestGuess, randomCode);

  expect(evaluation).toEqual(expectedEvaluation);
});
