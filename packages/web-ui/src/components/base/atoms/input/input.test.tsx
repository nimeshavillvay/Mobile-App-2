import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Label } from "~/components/base/atoms/label";
import { Input, inputStyles } from "./input";

describe("Input Component", () => {
  // Test for rendering the Input component
  it("should render the Input component", () => {
    render(<Input />);

    // Get the input element by its role
    const input = screen.getByRole("textbox");

    // Assert that the input element is in the document
    expect(input).toBeInTheDocument();

    // Assert that the input element has the correct initial styles
    expect(input).toHaveClass(inputStyles());
  });

  // Test for handling the disabled state
  it("should handle the disabled state correctly", () => {
    // Render the Input component in a disabled state
    render(<Input disabled />);

    // Get the input element by its role
    const input = screen.getByRole("textbox");

    // Assert that the input element is disabled
    expect(input).toBeDisabled();
  });

  // Test for accepting numeric values
  it("should accept numeric values", () => {
    // Render the Input component with type="number"
    render(
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="number-input">Number</Label>
        <Input id="number-input" type="number" />
      </div>,
    );

    // Get the input element by its label
    const input = screen.getByLabelText("Number");

    // Simulate changing the input value to a numeric value
    fireEvent.change(input, { target: { value: "123" } });

    // Assert that the input element has the correct numeric value
    expect(input).toHaveValue(123);
  });

  // Test for not accepting non-numeric values
  it("should not accept non-numeric values", () => {
    // Render the Input component with type="number"
    render(
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="number-input">Number</Label>
        <Input id="number-input" type="number" />
      </div>,
    );

    // Get the input element by its label
    const input = screen.getByLabelText("Number");

    // Simulate changing the input value to a non-numeric value
    fireEvent.change(input, { target: { value: "abc" } });

    // Assert that the input element does not accept non-numeric values
    expect(input).toHaveValue(null);
  });

  // Test for handling empty input correctly
  it("should handle empty input correctly", () => {
    // Render the Input component with type="number"
    render(
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="number-input">Number</Label>
        <Input id="number-input" type="number" />
      </div>,
    );

    // Get the input element by its label
    const input = screen.getByLabelText("Number");

    // Simulate changing the input value to an empty string
    fireEvent.change(input, { target: { value: "" } });

    // Assert that the input element correctly handles an empty value
    expect(input).toHaveValue(null);
  });

  // Test for phone number masking
  it("should apply phone number mask correctly", async () => {
    const user = userEvent.setup();
    render(
      <Input
        type="tel"
        mask="(___) ___-____"
        replacement={{ _: /\d/ }}
        placeholder="(123) 456-7890"
      />,
    );

    const input = screen.getByPlaceholderText(
      "(123) 456-7890",
    ) as HTMLInputElement;

    await user.type(input, "1234567890");
    expect(input.value).toBe("(123) 456-7890");

    await user.clear(input);
    await user.type(input, "12345");
    expect(input.value).toBe("(123) 45");
  });

  it("should apply custom pattern mask correctly", async () => {
    const user = userEvent.setup();
    render(
      <Input
        type="text"
        mask="xx-____"
        replacement={{ x: /[A-Z]/, _: /\d/ }}
        placeholder="AB-1234"
      />,
    );

    const input = screen.getByPlaceholderText("AB-1234") as HTMLInputElement;

    await user.type(input, "AB1234");
    expect(input.value).toBe("AB-1234");
  });

  // Test for handling invalid input with mask
  it("should handle invalid input with mask", async () => {
    const user = userEvent.setup();
    render(
      <Input
        type="tel"
        mask="(___) ___-____"
        replacement={{ _: /\d/ }}
        placeholder="(123) 456-7890"
      />,
    );

    const input = screen.getByPlaceholderText(
      "(123) 456-7890",
    ) as HTMLInputElement;

    await user.type(input, "abcdefghij");
    expect(input.value).toBe("");
  });

  // Test for maintaining cursor position after masking
  it("should maintain cursor position after masking", () => {
    render(
      <Input
        type="tel"
        mask="(___) ___-____"
        replacement={{ _: /\d/ }}
        placeholder="(123) 456-7890"
      />,
    );

    const input = screen.getByPlaceholderText(
      "(123) 456-7890",
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "123" } });
    input.setSelectionRange(3, 3);

    fireEvent.change(input, { target: { value: "(123) 4" } });
    expect(input.selectionStart).toBe(7);
    expect(input.selectionEnd).toBe(7);
  });
});
