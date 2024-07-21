import { SearchBox } from "~/components/search/search-box";
import { fireEvent, render, screen } from "~/lib/test-utils";

// Mock the vector icons
jest.mock("@expo/vector-icons/AntDesign", () => "AntDesign");
jest.mock("@expo/vector-icons/Feather", () => "Feather");

describe("SearchBox", () => {
  it("renders correctly", () => {
    render(<SearchBox />);
    expect(screen.getByTestId("search-box-container")).toBeTruthy();
  });

  it("renders the search icon", () => {
    render(<SearchBox />);
    expect(screen.getByTestId("search-icon")).toBeTruthy();
  });

  it("renders the input field with correct props", () => {
    render(<SearchBox />);
    const input = screen.getByPlaceholderText("What are you looking for?");
    expect(input).toBeTruthy();
    expect(input.props.returnKeyType).toBe("search");
  });

  it("renders the clear icon", () => {
    render(<SearchBox />);
    expect(screen.getByTestId("clear-icon")).toBeTruthy();
  });

  it("clears input when clear icon is pressed", async () => {
    render(<SearchBox />);
    const input = screen.getByPlaceholderText("What are you looking for?");
    const clearIcon = screen.getByTestId("clear-icon");

    fireEvent.changeText(input, "Test input");
    expect(input.props.value).toBe("Test input");

    fireEvent.press(clearIcon);
    expect(input.props.value).toBe("");
  });

  it("applies correct styles to the container", () => {
    render(<SearchBox />);
    const container = screen.getByTestId("search-box-container");
    expect(container.props.style).toMatchObject({
      flexBasis: "auto",
      flexDirection: "row",
      borderStyle: "solid",
      paddingRight: 20,
      alignItems: "center",
    });
  });

  it("applies correct styles to the XStack", () => {
    render(<SearchBox />);
    const xstack = screen.getByTestId("search-box-xstack");
    expect(xstack.props.style).toMatchObject({
      alignItems: "center",
      justifyContent: "flex-start",
      width: "90%",
    });
  });

  it("applies correct style to the clear icon", () => {
    render(<SearchBox />);
    const clearIcon = screen.getByTestId("clear-icon");
    expect(clearIcon.props.style).toMatchObject({
      marginLeft: "auto",
    });
  });
});
