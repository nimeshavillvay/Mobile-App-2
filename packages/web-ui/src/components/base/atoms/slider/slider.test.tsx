import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Slider } from "./slider";

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Slider Component", () => {
  it("renders correctly with default props", () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />);

    // Check if the slider is in the document
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();

    // Check initial value
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
  });
});
