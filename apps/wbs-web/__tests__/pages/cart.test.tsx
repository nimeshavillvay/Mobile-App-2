import Page from "@/cart/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Cart Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});