import { render, screen } from "@testing-library/react";
import { Progress } from "./progress"; // Adjust the import path as needed

describe("Progress Component", () => {
  it("renders the progress component with the correct value", () => {
    render(<Progress value={50} />);

    // Check if the progress root is rendered
    const progressRoot = screen.getByRole("progressbar");
    expect(progressRoot).toBeDefined();

    // Check if the progress indicator is rendered
    const progressIndicator = screen.getByRole("progressbar").childNodes[0] as
      | HTMLElement
      | undefined;
    expect(progressIndicator).toBeDefined();

    if (progressIndicator) {
      expect(progressIndicator.style.transform).toBe("translateX(-50%)");
    }
  });

  it("renders the progress component with a default value of 0 when no value is provided", () => {
    render(<Progress />);

    const progressRoot = screen.getByRole("progressbar");
    expect(progressRoot).toBeDefined();

    // Check if the progress indicator is rendered
    const progressIndicator = screen.getByRole("progressbar").childNodes[0] as
      | HTMLElement
      | undefined;
    expect(progressIndicator).toBeDefined();

    if (progressIndicator) {
      expect(progressIndicator.style.transform).toBe("translateX(-100%)");
    }
  });
});
