import { Input } from "@repo/web-ui/components/base/atoms/input";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { usePhoneNumberFormatter } from "./use-phone-number-formatter.hook";

// Test component that uses the hook
const TestComponent: React.FC = () => {
  const { phoneNumber, formatPhoneNumber } = usePhoneNumberFormatter();

  return (
    <div>
      <Input
        data-testid="phone-input"
        onChange={formatPhoneNumber}
        value={phoneNumber}
      />
    </div>
  );
};

describe("usePhoneNumberFormatter", () => {
  it("should initialize with an empty string", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("phone-input")).toHaveValue("");
  });

  it("should format a complete phone number correctly", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("phone-input");
    fireEvent.change(input, { target: { value: "1234567890" } });
    expect(screen.getByTestId("phone-input")).toHaveValue("(123) 456-7890");
  });

  it("should handle partial input correctly", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("phone-input");

    fireEvent.change(input, { target: { value: "123" } });
    expect(screen.getByTestId("phone-input")).toHaveValue("123");

    fireEvent.change(input, { target: { value: "123456" } });
    expect(screen.getByTestId("phone-input")).toHaveValue("(123) 456");
  });

  it("should remove non-digit characters", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("phone-input");
    fireEvent.change(input, { target: { value: "abc123def456ghi7890" } });
    expect(screen.getByTestId("phone-input")).toHaveValue("(123) 456-7890");
  });

  it("should handle empty input", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("phone-input");
    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.change(input, { target: { value: "" } });
    expect(screen.getByTestId("phone-input")).toHaveValue("");
  });

  it("should handle input with more than 10 digits", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("phone-input");
    fireEvent.change(input, { target: { value: "12345678901234" } });
    expect(screen.getByTestId("phone-input")).toHaveValue("(123) 456-7890");
  });
});
