import { Input } from "@repo/web-ui/components/base/atoms/input";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useZipCodeFormatter } from "./use-zip-code.hook";

// Test component that uses the hook
const TestComponent: React.FC = () => {
  const { zipCode, formatZipCode } = useZipCodeFormatter();

  return (
    <div>
      <Input data-testid="zip-input" onChange={formatZipCode} value={zipCode} />
    </div>
  );
};

describe("useZipCodeFormatter", () => {
  it("should initialize with an empty string", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("zip-input")).toHaveValue("");
  });

  it("should format a complete zip code correctly", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("zip-input");
    fireEvent.change(input, { target: { value: "12345" } });
    expect(screen.getByTestId("zip-input")).toHaveValue("12345");
  });

  it("should handle partial input correctly", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("zip-input");

    fireEvent.change(input, { target: { value: "123" } });
    expect(screen.getByTestId("zip-input")).toHaveValue("123");

    fireEvent.change(input, { target: { value: "1234" } });
    expect(screen.getByTestId("zip-input")).toHaveValue("1234");
  });

  it("should remove non-digit characters", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("zip-input");
    fireEvent.change(input, { target: { value: "abc123de45f" } });
    expect(screen.getByTestId("zip-input")).toHaveValue("12345");
  });

  it("should handle empty input", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("zip-input");
    fireEvent.change(input, { target: { value: "12345" } });
    fireEvent.change(input, { target: { value: "" } });
    expect(screen.getByTestId("zip-input")).toHaveValue("");
  });

  it("should handle input with more than 5 digits", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("zip-input");
    fireEvent.change(input, { target: { value: "123456789" } });
    expect(screen.getByTestId("zip-input")).toHaveValue("12345");
  });
});
