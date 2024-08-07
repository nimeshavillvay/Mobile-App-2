import {
  SearchCategory,
  SearchCategorySkeleton,
} from "~/components/search/suggestion/search-category";
import { render, screen } from "~/lib/test-utils";

jest.mock("expo-router", () => ({
  Link: "Link",
}));

describe("SearchCategorySkeleton", () => {
  it("renders correctly", () => {
    render(<SearchCategorySkeleton />);
    const skeleton = screen.getByTestId("motiview-skeleton");
    expect(skeleton).toBeOnTheScreen();
  });

  it("has correct height and width", () => {
    render(<SearchCategorySkeleton />);
    const skeleton = screen.getByTestId("motiview-skeleton");
    expect(skeleton.props.children.props.height).toBe(40);
    expect(skeleton.props.children.props.width).toBe("100%");
  });

  it("has light color mode", () => {
    render(<SearchCategorySkeleton />);
    const skeleton = screen.getByTestId("motiview-skeleton");
    expect(skeleton.props.children.props.colorMode).toBe("light");
  });
});

describe("SearchCategory", () => {
  const defaultProps = {
    category: "Test Category",
    link: "/test-link",
  };

  it("renders the category text", () => {
    render(<SearchCategory {...defaultProps} />);
    expect(screen.getByText("Test Category")).toBeOnTheScreen();
  });

  it("renders the Feather icon", () => {
    render(<SearchCategory {...defaultProps} />);
    const icon = screen.getByTestId("feather-icon");
    expect(icon).toBeOnTheScreen();
  });

  it("renders a Link component with the correct href", () => {
    render(<SearchCategory {...defaultProps} />);
    const link = screen.getByTestId("link");
    expect(link.props.href).toBe("/test-link");
  });

  it("applies custom styles to the XStack component", () => {
    const customStyle = { backgroundColor: "red" };
    render(<SearchCategory {...defaultProps} style={customStyle} />);
    const xstack = screen.getByTestId("x-stack");
    expect(xstack.props.style).toMatchObject(customStyle);
  });

  it("renders the category text in the correct color", () => {
    render(<SearchCategory {...defaultProps} />);
    const text = screen.getByTestId("text");
    expect(text.props.style.color).toBe("#CC0000");
  });

  it("renders the icon with the correct size and color", () => {
    render(<SearchCategory {...defaultProps} />);
    const icon = screen.getByTestId("feather-icon");
    expect(icon.props.style[0].fontSize).toBe(20);
    expect(icon.props.style[0].color).toBe("#74767B");
  });

  it("renders the XStack with correct alignment and gap", () => {
    render(<SearchCategory {...defaultProps} />);
    const xstack = screen.getByTestId("x-stack");
    expect(xstack.props.style.alignItems).toBe("center");
    expect(xstack.props.style.gap).toBe(10);
  });

  it("renders correctly with provided props", () => {
    render(<SearchCategory {...defaultProps} />);

    const xStack = screen.getByTestId("x-stack");
    expect(xStack).toBeOnTheScreen();

    const icon = screen.getByTestId("feather-icon");
    expect(icon).toBeOnTheScreen();

    const link = screen.getByTestId("link");
    expect(link).toBeOnTheScreen();

    const text = screen.getByTestId("text");
    expect(text).toBeOnTheScreen();
  });

  it("renders Feather icon with correct properties", () => {
    render(<SearchCategory {...defaultProps} />);
    const icon = screen.getByTestId("feather-icon");
    expect(icon.props.style[0].fontSize).toBe(20);
    expect(icon.props.style[0].color).toBe("#74767B");
  });

  it("passes additional style props to XStack", () => {
    const additionalProps = { backgroundColor: "red", padding: 10 };
    render(<SearchCategory {...defaultProps} {...additionalProps} />);

    const xStack = screen.getByTestId("x-stack");
    expect(xStack.props.style.backgroundColor).toBe("red");
    expect(xStack.props.style.paddingTop).toBe(10);
    expect(xStack.props.style.paddingBottom).toBe(10);
    expect(xStack.props.style.paddingLeft).toBe(10);
    expect(xStack.props.style.paddingRight).toBe(10);
  });

  it("has correct text color", () => {
    render(<SearchCategory {...defaultProps} />);
    const text = screen.getByTestId("text");
    expect(text.props.style.color).toBe("#CC0000");
  });

  it("has correct line height for text", () => {
    render(<SearchCategory {...defaultProps} />);
    const text = screen.getByTestId("text");
    expect(text.props.style.lineHeight).toBe(20);
  });

  it("renders with empty category", () => {
    const emptyProps = { ...defaultProps, category: "" };
    render(<SearchCategory {...emptyProps} />);
    const text = screen.getByTestId("text");
    expect(text.props.children).toBe("");
  });

  it("renders with very long category name", () => {
    const longCategoryProps = {
      ...defaultProps,
      category:
        "This is a very long category name that might cause issues with layout",
    };
    render(<SearchCategory {...longCategoryProps} />);
    const text = screen.getByTestId("text");
    expect(text.props.children).toBe(
      "This is a very long category name that might cause issues with layout",
    );
  });

  it("renders with special characters in category", () => {
    const specialCharsProps = { ...defaultProps, category: "!@#$%^&*()_+" };
    render(<SearchCategory {...specialCharsProps} />);
    const text = screen.getByTestId("text");
    expect(text.props.children).toBe("!@#$%^&*()_+");
  });

  it("renders with empty link", () => {
    const emptyLinkProps = { ...defaultProps, link: "" };
    render(<SearchCategory {...emptyLinkProps} />);
    const link = screen.getByTestId("link");
    expect(link.props.href).toBe("");
  });
});
