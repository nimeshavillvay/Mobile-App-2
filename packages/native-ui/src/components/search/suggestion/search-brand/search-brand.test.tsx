import {
  SearchBrand,
  SearchBrandSkeleton,
} from "~/components/search/suggestion/search-brand";
import { render, screen } from "~/lib/test-utils";

describe("SearchBrandSkeleton", () => {
  it("renders correctly", () => {
    render(<SearchBrandSkeleton />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeOnTheScreen();
  });

  it("has correct Skeleton properties", () => {
    render(<SearchBrandSkeleton />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton.props.children.props.height).toBe(40);
    expect(skeleton.props.children.props.width).toBe("20%");
    expect(skeleton.props.children.props.colorMode).toBe("light");
  });
});

describe("SearchBrand", () => {
  const defaultProps = {
    imageUrl: "https://example.com/image.jpg",
    brandName: "Test Brand",
    link: "/test-link",
  };

  it("renders correctly with given props", () => {
    render(<SearchBrand {...defaultProps} />);

    const brandNameElement = screen.getByText("Test Brand");
    expect(brandNameElement).toBeOnTheScreen();

    const imageElement = screen.getByTestId("brand-image");
    expect(imageElement.props.source[0].uri).toBe(
      "https://example.com/image.jpg",
    );
  });

  it("applies custom styles", () => {
    render(
      <SearchBrand
        {...defaultProps}
        backgroundColor="red"
        testID="custom-style"
      />,
    );

    const container = screen.getByTestId("custom-style");
    expect(container.props.style.backgroundColor).toEqual("red");
  });

  it("renders correctly with all props", () => {
    render(<SearchBrand {...defaultProps} />);

    expect(screen.getByText("Test Brand")).toBeOnTheScreen();
    expect(screen.getByTestId("brand-image")).toBeOnTheScreen();
  });

  it("renders Image with correct source", () => {
    render(<SearchBrand {...defaultProps} />);
    const image = screen.getByTestId("brand-image");
    expect(image.props.source[0].uri).toBe("https://example.com/image.jpg");
  });

  it("applies correct style to Image", () => {
    render(<SearchBrand {...defaultProps} />);
    const image = screen.getByTestId("brand-image");
    expect(image.props.style).toEqual({ height: 20, width: 20 });
  });

  it("renders without image when imageUrl is not provided", () => {
    const propsWithoutImage = { ...defaultProps, imageUrl: undefined };
    render(<SearchBrand {...propsWithoutImage} />);
    expect(screen.getByTestId("brand-image").props.source.uri).toBeUndefined();
  });

  it("renders with empty brandName", () => {
    const propsWithEmptyBrand = { ...defaultProps, brandName: "" };
    render(<SearchBrand {...propsWithEmptyBrand} />);
    expect(screen.getByText("")).toBeOnTheScreen();
  });

  it("renders with very long brandName", () => {
    const longBrandName =
      "This is a very long brand name that might cause layout issues";
    const propsWithLongBrand = { ...defaultProps, brandName: longBrandName };
    render(<SearchBrand {...propsWithLongBrand} />);
    expect(screen.getByText(longBrandName)).toBeOnTheScreen();
  });

  it("renders with special characters in brandName", () => {
    const specialBrandName = "!@#$%^&*()_+";
    const propsWithSpecialBrand = {
      ...defaultProps,
      brandName: specialBrandName,
    };
    render(<SearchBrand {...propsWithSpecialBrand} />);
    expect(screen.getByText(specialBrandName)).toBeOnTheScreen();
  });

  it("has correct XStack properties", () => {
    render(<SearchBrand {...defaultProps} />);
    const xStack = screen.getByTestId("x-stack");
    expect(xStack.props.style.alignItems).toBe("center");
    expect(xStack.props.style.gap).toBe(10);
    expect(xStack.props.style.borderTopWidth).toBe(1);
    expect(xStack.props.style.borderBottomWidth).toBe(1);
    expect(xStack.props.style.borderLeftWidth).toBe(1);
    expect(xStack.props.style.borderRightWidth).toBe(1);
    expect(xStack.props.style.borderTopColor).toBe("#E5E7EB");
    expect(xStack.props.style.borderBottomColor).toBe("#E5E7EB");
    expect(xStack.props.style.borderLeftColor).toBe("#E5E7EB");
    expect(xStack.props.style.borderRightColor).toBe("#E5E7EB");
    expect(xStack.props.style.paddingTop).toBe(10);
    expect(xStack.props.style.paddingBottom).toBe(10);
    expect(xStack.props.style.paddingLeft).toBe(10);
    expect(xStack.props.style.paddingRight).toBe(10);
  });

  it("renders correctly when all optional props are omitted", () => {
    const minimalProps = { brandName: "Minimal Brand", link: "/minimal" };
    render(<SearchBrand {...minimalProps} />);
    expect(screen.getByText("Minimal Brand")).toBeOnTheScreen();
  });
});
