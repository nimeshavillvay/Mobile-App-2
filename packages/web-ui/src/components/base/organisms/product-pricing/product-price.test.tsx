import type { ProductPrice } from "@repo/shared-logic/models/pricing";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { calculateDiscount } from "~/lib/utils";
import ProductPricing from "./product-price";

// Mock the utility functions
jest.mock("~/lib/utils", () => ({
  calculateDiscount: jest.fn(),
  formatNumberToPrice: jest.fn((price) => price.toFixed(2)),
  cn: jest.fn((...args) => args.filter(Boolean).join(" ")),
}));

describe("ProductPricing", () => {
  const baseProductPrice: ProductPrice = {
    price: 19.99,
    listPrice: 24.99,
    uomPriceUnit: "each",
    priceBreakdowns: [
      { quantity: 1, price: 19.99 },
      { quantity: 5, price: 18.99 },
      { quantity: 10, price: 17.99 },
      { quantity: 20, price: 16.99 },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the main price correctly", () => {
    render(<ProductPricing productPrice={baseProductPrice} />);
    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByText("19.99")).toBeInTheDocument();
  });

  it("renders the UOM price unit", () => {
    render(<ProductPricing productPrice={baseProductPrice} />);
    expect(screen.getByText("each")).toBeInTheDocument();
  });

  it("renders the list price when there is a discount", () => {
    (calculateDiscount as jest.Mock).mockReturnValue(20);
    render(<ProductPricing productPrice={baseProductPrice} />);
    expect(screen.getByText("$24.99")).toBeInTheDocument();
    expect(screen.getByText("$24.99")).toHaveClass("line-through");
  });

  it("does not render the list price when there is no discount", () => {
    (calculateDiscount as jest.Mock).mockReturnValue(0);
    render(<ProductPricing productPrice={baseProductPrice} />);
    expect(screen.queryByText("$24.99")).not.toBeInTheDocument();
  });

  it("renders all price breakdowns", () => {
    render(<ProductPricing productPrice={baseProductPrice} />);
    baseProductPrice.priceBreakdowns?.forEach((breakdown) => {
      expect(
        screen.getByText(`${breakdown.quantity} items`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`$${breakdown.price?.toFixed(2)}`),
      ).toBeInTheDocument();
    });
  });

  it("applies custom className", () => {
    const customClass = "bg-black";
    render(
      <ProductPricing
        productPrice={baseProductPrice}
        className={customClass}
      />,
    );
    expect(screen.getByTitle("product-price")).toHaveClass(customClass);
  });

  it("uses the minimum of breakdown price and product price", () => {
    const productPriceWithHigherBreakdown = {
      ...baseProductPrice,
      price: 15.99,
      priceBreakdowns: [{ quantity: 1, price: 19.99 }],
    };
    render(<ProductPricing productPrice={productPriceWithHigherBreakdown} />);
    expect(screen.getByText("$15.99")).toBeInTheDocument();
  });

  it("handles missing priceBreakdowns", () => {
    const productPriceWithoutBreakdowns = {
      ...baseProductPrice,
      priceBreakdowns: undefined,
    };
    render(<ProductPricing productPrice={productPriceWithoutBreakdowns} />);
    expect(screen.queryByText("items")).not.toBeInTheDocument();
  });
});
