import { AddToCartButton } from "@/_components/molecules/product-card/buttons/add-to-cart";
import { fireEvent, render, screen } from "@testing-library/react";

describe("AddToCartButton", () => {
  it("renders with the correct label", () => {
    render(<AddToCartButton label="Add to Cart" />);
    expect(screen.getByText("Add to Cart")).toBeDefined();
  });

  it("calls the addToCart function when clicked", () => {
    const mockAddToCart = jest.fn();
    render(<AddToCartButton addToCart={mockAddToCart} label="Add to Cart" />);

    const button = screen.getByText("Add to Cart");
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalled();
  });

  it("does not call the addToCart function when clicked", () => {
    const mockAddToCart = jest.fn();
    render(<AddToCartButton label="Add to Cart" />);

    const button = screen.getByText("Add to Cart");
    fireEvent.click(button);

    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it("does not call the addToCart function when disabled", () => {
    const mockAddToCart = jest.fn();
    render(
      <AddToCartButton
        addToCart={mockAddToCart}
        label="Add to Cart"
        disabled
      />,
    );

    const button = screen.getByText("Add to Cart");
    fireEvent.click(button);

    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it("displays the button as disabled when the disabled prop is true", () => {
    render(<AddToCartButton label="Add to Cart" disabled />);
    const button = screen.getByText("Add to Cart");
    expect(button).toBeDisabled();
  });
});
