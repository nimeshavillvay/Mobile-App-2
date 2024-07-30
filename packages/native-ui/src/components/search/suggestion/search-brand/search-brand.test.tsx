import { SearchBrand } from "~/components/search/suggestion/search-brand";
import { fireEvent, render, screen } from "~/lib/test-utils";

const defaultProps = {
  imageUrl: "https://example.com/image.jpg",
  brandName: "Test Brand",
  link: "/example",
};

describe("SearchBrand", () => {
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

  it("handles press event", () => {
    const onPressMock = jest.fn();
    render(
      <SearchBrand
        {...defaultProps}
        onPress={onPressMock}
        testID="pressable"
      />,
    );

    const pressableElement = screen.getByTestId("pressable");
    fireEvent.press(pressableElement);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
