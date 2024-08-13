import { render, screen } from "@testing-library/react";
import { formatNumberToPrice } from "~/lib/utils";
import {
  OrientationContext,
  ProductCard,
  ProductCardActions,
  ProductCardBadge,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardPrice,
  ProductCardSkeleton,
  ProductCardVariantSelector,
} from "./product-card"; // Adjust import path as needed

describe("ProductCard", () => {
  it("renders with vertical orientation by default", () => {
    render(<ProductCard>Test Content</ProductCard>);
    const card = screen.getByText("Test Content");
    expect(card.className).toContain(
      "w-[12.5rem] flex-col gap-3 md:w-64 md:p-4",
    );
  });

  it("renders with horizontal orientation when specified", () => {
    render(<ProductCard orientation="horizontal">Test Content</ProductCard>);
    const card = screen.getByText("Test Content");
    expect(card.className).toContain("w-[24.75rem] flex-row gap-3");
  });

  it("applies custom className", () => {
    render(<ProductCard className="bg-green-100">Test Content</ProductCard>);
    const card = screen.getByText("Test Content");
    expect(card.className).toContain("bg-green-100");
  });
});

describe("ProductCardBadge", () => {
  it("renders the New badge with the correct variant and content", () => {
    render(<ProductCardBadge productVariant="new">New</ProductCardBadge>);
    const badge = screen.getByText("New");
    const badgeBaseClassNames =
      "inline-flex items-center rounded border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2";
    expect(badge.className).toContain(
      badgeBaseClassNames +
        " shadow-none bg-red-50 text-yellow-700 hover:bg-red-100",
    );
    expect(screen.getByText("New")).toBeDefined();
  });

  it("renders the Sale badge with the correct variant and content", () => {
    render(<ProductCardBadge productVariant="sale">Sale</ProductCardBadge>);
    const badge = screen.getByText("Sale");
    const badgeBaseClassNames =
      "inline-flex items-center rounded border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2";
    expect(badge.className).toContain(
      badgeBaseClassNames +
        " shadow-none bg-sky-50 text-wurth-blue-450 hover:bg-sky-100",
    );
    expect(screen.getByText("Sale")).toBeDefined();
  });
});

describe("ProductCardDiscount", () => {
  it("renders the discount content", () => {
    render(<ProductCardDiscount variant="primary">20</ProductCardDiscount>);
    expect(screen.getByText("20%")).toBeDefined();
  });
});

describe("ProductCardHero", () => {
  it("renders the hero content", () => {
    render(
      <ProductCardHero>
        <div>Hero Content</div>
      </ProductCardHero>,
    );
    expect(screen.getByText("Hero Content")).toBeDefined();
  });

  it("applies horizontal orientation classes", () => {
    render(
      <OrientationContext.Provider value="horizontal">
        <ProductCardHero>Hero Content</ProductCardHero>
      </OrientationContext.Provider>,
    );
    const hero = screen.getByText("Hero Content");
    expect(hero.className).toContain(
      "relative shrink-0 space-y-0 overflow-hidden rounded p-0 flex flex-col justify-between",
    );
  });
});

describe("ProductCardImage", () => {
  const renderProductCardImage = (
    orientation: "horizontal" | "vertical" = "vertical",
  ) => {
    render(
      <OrientationContext.Provider value={orientation}>
        <ProductCardImage
          src="https://via.placeholder.com/300x300"
          alt="Test Product"
          href="/test-product"
          title="Test Product"
          width={224}
          height={224}
        />
      </OrientationContext.Provider>,
    );
  };

  it("renders the product image with correct attributes", () => {
    renderProductCardImage();
    const imageLink = screen.getByTestId("product-card-image-link");
    expect(imageLink).toBeDefined();
    expect(imageLink.getAttribute("href")).toBe("/test-product");
    const image = screen.getByAltText("Test Product");
    expect(image).toBeDefined();
    expect(image.getAttribute("width")).toBe("224");
    expect(image.getAttribute("height")).toBe("224");
  });

  it("applies default vertical orientation classes", () => {
    renderProductCardImage();
    const image = screen.getByAltText("Test Product");
    expect(image.className).toContain(
      "aspect-1 object-contain size-44 md:size-56",
    );
  });

  it("applies horizontal orientation classes", () => {
    renderProductCardImage("horizontal");
    const image = screen.getByAltText("Test Product");
    expect(image.className).toContain("aspect-1 object-contain size-[8.5rem]");
  });
});

describe("ProductCardContent", () => {
  it("renders the content", () => {
    render(
      <ProductCardContent>
        <div>Test Content</div>
      </ProductCardContent>,
    );
    expect(screen.getByText("Test Content")).toBeDefined();
  });
});

describe("ProductCardDetails", () => {
  it("renders the product title and SKU", () => {
    render(<ProductCardDetails title="Test Product" sku="SKU12345" href="#" />);
    expect(screen.getByText("Test Product")).toBeDefined();
    expect(screen.getByText("SKU12345")).toBeDefined();
  });

  it("renders plain text title when useInnerHtml is false", () => {
    render(
      <ProductCardDetails
        title="Test Product"
        sku="SKU12345"
        href="#"
        useInnerHtml={false}
      />,
    );
    const titleElement = screen.getByText("Test Product");
    expect(titleElement.tagName).toBe("A");
    expect(titleElement.innerHTML).toBe("Test Product");
  });

  it("renders HTML title when useInnerHtml is true", () => {
    render(
      <ProductCardDetails
        title="<em>Test</em> Product"
        sku="SKU12345"
        href="#"
        useInnerHtml={true}
      />,
    );
    const titleElement = screen.getByRole("heading", { level: 3 });
    expect(titleElement.innerHTML).toBe(
      '<a href="#"><span><em>Test</em> Product</span></a>',
    );
  });
});

describe("ProductCardPrice", () => {
  it("renders the product price and unit of measure", () => {
    render(<ProductCardPrice price={100} uom="ea" />);
    expect(screen.getByText(formatNumberToPrice(100))).toBeDefined();
    expect(screen.getByText("/ea")).toBeDefined();
  });

  it("does not render the actual price if actual price is not provided", () => {
    render(<ProductCardPrice price={100} uom="ea" />);
    expect(screen.getByText(formatNumberToPrice(100))).toBeDefined();
    expect(screen.queryByText(formatNumberToPrice(120))).toBeNull();
    expect(screen.getByText("/ea")).toBeDefined();
  });

  it("applies the correct class when price is less than actual price", () => {
    render(<ProductCardPrice price={100} uom="ea" actualPrice={120} />);
    const actualPriceElement = screen.getByText(formatNumberToPrice(120));
    expect(actualPriceElement.className).toContain(
      "ml-1 text-base font-normal text-wurth-gray-400 line-through md:text-lg",
    );
  });
});

describe("ProductCardActions Component", () => {
  it("renders the product card actions content and class names", () => {
    render(
      <ProductCardActions className="bg-black">
        Child Element
      </ProductCardActions>,
    );
    expect(screen.getByText("Child Element")).toBeDefined();
    const cardAction = screen.getByText("Child Element");
    expect(cardAction.className).toContain(
      "flex flex-row items-center gap-1 p-0 md:gap-2 bg-black",
    );
  });
});

describe("ProductCardVariantSelector", () => {
  const defaultProps = {
    href: "#",
    variants: [
      { value: "variant1", title: "Variant 1" },
      { value: "variant2", title: "Variant 2" },
    ],
    value: "variant1",
    onValueChange: jest.fn(),
    isFavorite: false,
    onClickShoppingList: jest.fn(),
    addToCart: jest.fn(),
  };

  it("renders the select component", () => {
    render(<ProductCardVariantSelector {...defaultProps} value="" />);

    expect(screen.getByText("Select a variation")).toBeDefined();
  });
});

describe("ProductCardSkeleton", () => {
  it("renders without crashing", () => {
    render(<ProductCardSkeleton />);
    expect(screen.getByTestId("skeleton")).toBeDefined();
  });

  it("applies default vertical orientation classes", () => {
    render(<ProductCardSkeleton />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton.className).toContain(
      "animate-pulse bg-zinc-900/10 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.08)] h-[23.25rem] w-[17.5rem] md:h-[25.75rem] md:w-64",
    );
  });

  it("applies horizontal orientation classes", () => {
    render(<ProductCardSkeleton orientation="horizontal" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton.className).toContain(
      "animate-pulse bg-zinc-900/10 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.08)] h-48 w-[24.75rem]",
    );
  });

  it("applies custom className", () => {
    render(<ProductCardSkeleton className="bg-black" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton.className).toContain("bg-black");
  });
});
