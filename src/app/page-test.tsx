import { describe, expect, test } from "vitest";

describe("example test", () => {
  it("should work correctly", () => {
    expect(true).toBe(true);
  });
});

// Example tests
const runTests = () => {
  const tests = [
    {
      guess: [
        { position: 1, color: "rosy" },
        { position: 2, color: "rosy" },
        { position: 3, color: "rosy" },
        { position: 4, color: "rosy" },
        { position: 5, color: "rosy" },
      ],
      answer: [
        { position: 1, color: "rosy" },
        { position: 2, color: "sunrise" },
        { position: 3, color: "azure" },
        { position: 4, color: "sunny" },
        { position: 5, color: "rosy" },
      ],
      expected: ["match", "miss", "miss", "miss", "match"],
    },
    {
      guess: [
        { position: 1, color: "sunny" },
        { position: 2, color: "sunny" },
        { position: 3, color: "sunny" },
        { position: 4, color: "sunny" },
        { position: 5, color: "sunny" },
      ],
      answer: [
        { position: 1, color: "sunny" },
        { position: 2, color: "sunrise" },
        { position: 3, color: "emerald" },
        { position: 4, color: "sunny" },
        { position: 5, color: "sunny" },
      ],
      expected: ["match", "miss", "miss", "match", "match"],
    },
  ];

  tests.forEach((test, index) => {
    const result = evaluateGuess(test.guess, test.answer);
    console.log(
      `Test ${index + 1}: ${
        JSON.stringify(result) === JSON.stringify(test.expected)
          ? "PASS"
          : "FAIL"
      }`
    );
    console.log(
      `Expected: ${JSON.stringify(test.expected)}, Got: ${JSON.stringify(
        result
      )}`
    );
  });
};

runTests();
