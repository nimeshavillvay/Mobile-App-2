import { SearchProduct } from "~/components/search/suggestion/search-product";
import { render, screen } from "~/lib/test-utils";

describe("SearchProduct", () => {
  // TODO Remove workaround after upgrading Expo and jest-expo
  // Suppress console.error because of this error "Warning: Unexpected ref object provided for ExpoImage. Use either a ref-setter function or React.createRef()."
  // https://github.com/expo/expo/issues/28831
  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-expect-error jest.spyOn adds this functionality
    console.error.mockImplementation(() => null);
  });

  // TODO Remove workaround after upgrading Expo and jest-expo
  // Suppress console.error because of this error "Warning: Unexpected ref object provided for ExpoImage. Use either a ref-setter function or React.createRef()."
  // https://github.com/expo/expo/issues/28831
  afterEach(() => {
    // @ts-expect-error jest.spyOn adds this functionality
    console.error.mockRestore();
  });

  const defaultProps = {
    imageUrl: "https://example.com/image.jpg",
    title: "Test Product",
    itemNo: "12345",
  };

  it("renders correctly with all props", () => {
    render(<SearchProduct {...defaultProps} />);

    // Check if the image is rendered with correct props
    const image = screen.getByTestId("search-product-image");
    expect(image).toHaveProperty("props.source[0].uri", defaultProps.imageUrl);
    expect(image).toHaveProperty("props.style.height", 80);
    expect(image).toHaveProperty("props.style.width", 80);

    // Check if the title is rendered
    expect(screen.getByText(defaultProps.title)).toBeOnTheScreen();

    // Check if the item number is rendered
    expect(screen.getByText("Item #")).toBeOnTheScreen();
    expect(screen.getByText(defaultProps.itemNo)).toBeOnTheScreen();
  });

  it("applies custom styles", () => {
    const customStyle = { backgroundColor: "red" };
    render(<SearchProduct {...defaultProps} backgroundColor="red" />);

    const container = screen.getByTestId("search-product-container");
    expect(container).toHaveStyle(customStyle);
  });

  it("truncates long titles", () => {
    const longTitle =
      "This is a very long product title that should be truncated because we have a limit of the product title length";
    render(<SearchProduct {...defaultProps} title={longTitle} />);

    const titleElement = screen.getByText(longTitle);
    expect(titleElement).toHaveProperty("props.numberOfLines", 3);
  });
});
