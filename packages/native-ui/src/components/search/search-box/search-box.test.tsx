import React from "react";
import type { TextInput } from "react-native";
import { SearchBox } from "~/components/search/search-box";
import { fireEvent, render, screen } from "~/lib/test-utils";

// Mock the vector icons
jest.mock("@expo/vector-icons/AntDesign", () => "AntDesign");
jest.mock("@expo/vector-icons/Feather", () => "Feather");

describe("SearchBox", () => {
  const mockOnChangeText = jest.fn();
  const mockOnClear = jest.fn();
  const mockRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <SearchBox
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        ref={mockRef}
      />,
    );
    expect(screen.getByTestId("search-box-container")).toBeOnTheScreen();
    expect(screen.getByTestId("search-box-xstack")).toBeOnTheScreen();
    expect(screen.getByTestId("search-icon")).toBeOnTheScreen();
    expect(screen.getByTestId("search-input")).toBeOnTheScreen();
    expect(screen.getByTestId("clear-icon")).toBeOnTheScreen();
  });

  it("applies correct styles to container", () => {
    render(
      <SearchBox
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        ref={mockRef}
      />,
    );
    const container = screen.getByTestId("search-box-container");
    expect(container.props.style).toMatchObject({
      flexBasis: "auto",
      flexDirection: "row",
      borderStyle: "solid",
      paddingRight: 20,
      alignItems: "center",
    });
  });

  it("applies correct styles to XStack", () => {
    render(
      <SearchBox
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        ref={mockRef}
      />,
    );
    const xstack = screen.getByTestId("search-box-xstack");
    expect(xstack.props.style).toMatchObject({
      alignItems: "center",
      justifyContent: "flex-start",
      width: "90%",
    });
  });

  it("renders AntDesign icon with correct props", () => {
    render(
      <SearchBox
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        ref={mockRef}
      />,
    );
    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon.props.name).toBe("search1");
    expect(searchIcon.props.size).toBe(20);
    expect(searchIcon.props.color).toBe("#cccccc");
  });

  it("renders Input with correct props", () => {
    render(
      <SearchBox
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        ref={mockRef}
      />,
    );
    const input = screen.getByTestId("search-input");
    expect(input.props.placeholder).toBe("What are you looking for?");
    expect(input.props.returnKeyType).toBe("search");
  });

  it("renders Feather icon with correct props", () => {
    render(
      <SearchBox
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        ref={mockRef}
      />,
    );
    const clearIcon = screen.getByTestId("clear-icon");
    expect(clearIcon.props.name).toBe("x");
    expect(clearIcon.props.size).toBe(20);
    expect(clearIcon.props.style).toMatchObject({ marginLeft: "auto" });
  });

  it("calls onChangeText when input text changes", () => {
    render(
      <SearchBox
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        ref={mockRef}
      />,
    );
    const input = screen.getByTestId("search-input");
    fireEvent.changeText(input, "test");
    expect(mockOnChangeText).toHaveBeenCalledWith("test");
  });

  it("calls onClear when clear icon is pressed", () => {
    render(
      <SearchBox
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        ref={mockRef}
      />,
    );
    const clearIcon = screen.getByTestId("clear-icon");
    fireEvent.press(clearIcon);
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it("forwards ref to Input component", () => {
    const ref = React.createRef<TextInput>();
    render(
      <SearchBox
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        ref={ref}
      />,
    );
    expect(ref.current).toBeTruthy();
  });
});
