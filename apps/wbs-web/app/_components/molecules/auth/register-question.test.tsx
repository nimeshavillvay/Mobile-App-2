import { fireEvent, render, screen } from "@testing-library/react";
import RegisterQuestion from "./register-question";

describe("RegisterQuestion", () => {
  const defaultProps = {
    question: "Test Question",
    options: ["Option1", "Option2"] as const,
    selectedOption: undefined,
    onOptionSelect: jest.fn(),
    testIdPrefix: "test",
  };

  it("renders the question", () => {
    render(<RegisterQuestion {...defaultProps} />);
    expect(screen.getByText("Test Question")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(<RegisterQuestion {...defaultProps} />);
    expect(screen.getByText("Option1")).toBeInTheDocument();
    expect(screen.getByText("Option2")).toBeInTheDocument();
  });

  it("calls onOptionSelect when an option is clicked", () => {
    render(<RegisterQuestion {...defaultProps} />);
    fireEvent.click(screen.getByText("Option1"));
    expect(defaultProps.onOptionSelect).toHaveBeenCalledWith("Option1");
  });

  it("applies correct classes to selected option", () => {
    const props = { ...defaultProps, selectedOption: "Option1" };
    render(<RegisterQuestion {...props} />);
    expect(screen.getByTestId("button-option1")).toHaveClass("border-black");
    expect(screen.getByTestId("button-option2")).not.toHaveClass(
      "border-black",
    );
  });

  it("renders CheckCircleFilled for selected option and CheckCircle for others", () => {
    const props = { ...defaultProps, selectedOption: "Option1" };
    render(<RegisterQuestion {...props} />);
    expect(screen.getByTestId("button-option1")).toContainElement(
      screen.getByTestId("icon-checkCircleFilled"),
    );
    expect(screen.getByTestId("button-option2")).toContainElement(
      screen.getByTestId("icon-checkCircle"),
    );
  });

  it("uses default testIdPrefix when not provided", () => {
    const props = { ...defaultProps, testIdPrefix: undefined };
    render(<RegisterQuestion {...props} />);
    expect(screen.getByTestId("question")).toBeInTheDocument();
  });
});
