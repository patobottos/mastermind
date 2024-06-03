import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it('should display the word "Random" on the home page', () => {
    render(<Home />);
    const randomText = screen.getByText(/Random/i);
    expect(randomText).toBeInTheDocument();
  });
});
