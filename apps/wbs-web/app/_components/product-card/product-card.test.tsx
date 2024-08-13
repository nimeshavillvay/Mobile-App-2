import { calculateDiscount } from "@/_lib/utils";
import type { LiteProduct } from "@repo/shared-logic/models/product";
import { render, screen } from "@testing-library/react";
import ProductCard from "./product-card"; // Adjust the import path as necessary

jest.mock("@/_lib/utils", () => ({
  calculateDiscount: jest.fn(),
  cn: jest.fn(),
}));

const mockProduct: LiteProduct = {
  id: "1",
  title: "Test Product",
  handle: "test-product",
  imageUrl: "https://via.placeholder.com/300x300",
  brandName: "Sample Brand",
  categoryName: "Sample Category",
  variants: [
    {
      id: "variant1",
      title: "Variant 1",
      handle: "variant-1",
      pricing: {
        price: 100,
        listPrice: 120,
        uomPriceUnit: "ea",
      },
      imageUrls: ["https://via.placeholder.com/300x300"],
      sku: "SKU12345",
      brandName: "Sample Brand",
      categoryName: "Sample Category",
    },
  ],
  metadata: {
    onSale: true,
    isNew: true,
  },
};

describe("ProductCard", () => {
  beforeEach(() => {
    (calculateDiscount as jest.Mock).mockReturnValue(20);
  });

  it("renders the product title as a link", () => {
    render(<ProductCard product={mockProduct} />);
    expect(
      screen.getByRole("link", { name: "Test Product" }),
    ).toBeInTheDocument();
  });

  it("renders sku as part of the product details", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("SKU12345")).toBeInTheDocument();
  });

  it("renders the product image", () => {
    render(<ProductCard product={mockProduct} />);
    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("/_next/image"),
    );
  });

  it("displays discount when available", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it('shows "Flash Deal" badge when product is on sale', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByTestId("zap-icon-flash-deal")).toBeInTheDocument();
  });

  it('renders the "New" badge when the product is new', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders variant selector when there are multiple variants", () => {
    const multiVariantProduct = {
      ...mockProduct,
      variants: [
        {
          id: "variant1",
          title: "Variant 1",
          handle: "variant-1",
          pricing: {
            price: 100,
            listPrice: 120,
            uomPriceUnit: "ea",
          },
          imageUrls: ["https://via.placeholder.com/300x300"],
          sku: "SKU12345",
          brandName: "Sample Brand",
          categoryName: "Sample Category",
        },
        {
          id: "variant2",
          title: "Variant 2",
          handle: "variant-2",
          pricing: {
            price: 200,
            listPrice: 220,
            uomPriceUnit: "ea2",
          },
          imageUrls: ["https://via.placeholder.com/300x300"],
          sku: "SKU6789",
          brandName: "Sample Brand 2",
          categoryName: "Sample Category 2",
        },
      ],
    };
    render(<ProductCard product={multiVariantProduct} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it('renders "Add to Cart" button by default', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it('does not render "Add to Cart" button if showAddToCart is false', () => {
    render(<ProductCard product={mockProduct} showAddToCart={false} />);
    expect(screen.queryByText("Add to Cart")).not.toBeInTheDocument();
  });

  it("renders Favorite button if showFavorite is true", () => {
    render(<ProductCard product={mockProduct} showFavorite={true} />);
    expect(screen.getByTestId("add-to-shopping-list")).toBeInTheDocument();
  });

  it("renders Compare button if showCompare is true", () => {
    render(<ProductCard product={mockProduct} showCompare={true} />);
    expect(screen.getByTestId("add-to-compare-list")).toBeInTheDocument();
  });

  it("renders link to product page", () => {
    const multiVariantProduct = {
      ...mockProduct,
      variants: [
        {
          id: "variant1",
          title: "Variant 1",
          handle: "variant-1",
          pricing: {
            price: 100,
            listPrice: 120,
            uomPriceUnit: "ea",
          },
          imageUrls: ["https://via.placeholder.com/300x300"],
          sku: "SKU12345",
          brandName: "Sample Brand",
          categoryName: "Sample Category",
        },
        {
          id: "variant2",
          title: "Variant 2",
          handle: "variant-2",
          pricing: {
            price: 200,
            listPrice: 220,
            uomPriceUnit: "ea2",
          },
          imageUrls: ["https://via.placeholder.com/300x300"],
          sku: "SKU6789",
          brandName: "Sample Brand 2",
          categoryName: "Sample Category 2",
        },
      ],
    };
    render(<ProductCard product={multiVariantProduct} />);
    const link = screen.getByRole("link", { name: /View item/i });
    expect(link).toHaveAttribute("href", "/products/test-product");
  });
});
