import { SearchCategory } from "~/components/search/suggestion/search-category";
import { render, screen } from "~/lib/test-utils";

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
    const link = screen.getByTestId("link");
    expect(link.props.style.color).toBe("#CC0000");
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
});
