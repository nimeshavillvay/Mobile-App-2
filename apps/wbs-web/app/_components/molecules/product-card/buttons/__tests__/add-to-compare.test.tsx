import { CompareButton } from "@/_components/molecules/product-card/buttons/add-to-compare";
import { fireEvent, render, screen } from "@testing-library/react";

describe("CompareButton", () => {
  it("renders with the correct icon when not compared", () => {
    render(<CompareButton isCompared={false} />);
    expect(screen.getByLabelText("Add to Compare List")).toBeDefined();
    expect(screen.getByTestId("add-to-compare-list")).toContainElement(
      screen.getByTestId("check-circle-filled-icon"),
    );
  });

  it("renders with the correct icon when compared", () => {
    render(<CompareButton isCompared={true} />);
    expect(screen.getByLabelText("Add to Compare List")).toBeDefined();
    expect(screen.getByTestId("add-to-compare-list")).toContainElement(
      screen.getByTestId("check-circle-icon"),
    );
  });

  it("calls the onClick function when clicked", () => {
    const mockOnClick = jest.fn();
    render(<CompareButton isCompared={false} onClick={mockOnClick} />);

    const button = screen.getByLabelText("Add to Compare List");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it("does not call the onClick function when clicked", () => {
    const mockAddToCart = jest.fn();
    render(<CompareButton isCompared={false} />);

    const button = screen.getByLabelText("Add to Compare List");
    fireEvent.click(button);

    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it("does not call the onClick function when disabled", () => {
    const mockOnClick = jest.fn();
    render(<CompareButton isCompared={false} onClick={mockOnClick} disabled />);

    const button = screen.getByLabelText("Add to Compare List");
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("displays the button as disabled when the disabled prop is true", () => {
    render(<CompareButton isCompared={false} disabled />);
    const button = screen.getByLabelText("Add to Compare List");
    expect(button).toBeDisabled();
  });
});
