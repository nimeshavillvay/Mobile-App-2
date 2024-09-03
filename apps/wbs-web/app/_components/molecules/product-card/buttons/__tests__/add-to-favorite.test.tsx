import { FavoriteButton } from "@/_components/molecules/product-card/buttons/add-to-favorite";
import { fireEvent, render, screen } from "@testing-library/react";

describe("FavoriteButton", () => {
  it("renders with the correct icon when not favorite", () => {
    render(<FavoriteButton isFavorite={false} />);
    expect(screen.getByLabelText("Add to favorites")).toBeDefined();
    expect(screen.getByTestId("add-to-shopping-list")).toContainElement(
      screen.getByTestId("heart-outline"),
    );
  });

  it("renders with the correct icon when favorite", () => {
    render(<FavoriteButton isFavorite={true} />);
    expect(screen.getByLabelText("Add to favorites")).toBeDefined();
    expect(screen.getByTestId("add-to-shopping-list")).toContainElement(
      screen.getByTestId("heart-filled"),
    );
  });

  it("calls the onClick function when clicked", () => {
    const mockOnClick = jest.fn();
    render(<FavoriteButton isFavorite={false} onClick={mockOnClick} />);

    const button = screen.getByLabelText("Add to favorites");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it("does not call the onClick function when clicked", () => {
    const mockAddToCart = jest.fn();
    render(<FavoriteButton isFavorite={false} />);

    const button = screen.getByLabelText("Add to favorites");
    fireEvent.click(button);

    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it("does not call the onClick function when disabled", () => {
    const mockOnClick = jest.fn();
    render(
      <FavoriteButton isFavorite={false} onClick={mockOnClick} disabled />,
    );

    const button = screen.getByLabelText("Add to favorites");
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("displays the button as disabled when the disabled prop is true", () => {
    render(<FavoriteButton isFavorite={false} disabled />);
    const button = screen.getByLabelText("Add to favorites");
    expect(button).toBeDisabled();
  });
});
