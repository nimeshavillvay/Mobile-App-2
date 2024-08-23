import { fireEvent, render, screen } from "@testing-library/react";
import { PasswordInput } from "./password-input";

describe("PasswordInput", () => {
  it("initially renders a password field", () => {
    render(<PasswordInput />);
    const input = screen.getByLabelText("password");
    expect(input.getAttribute("type")).toBe("password");
  });

  it("toggles between password and text type when show/hide button is clicked", () => {
    render(<PasswordInput />);
    const input = screen.getByLabelText("password");
    const toggleButton = screen.getByRole("button");

    expect(input.getAttribute("type")).toBe("password");
    fireEvent.click(toggleButton);
    expect(input.getAttribute("type")).toBe("text");
    fireEvent.click(toggleButton);
    expect(input.getAttribute("type")).toBe("password");
  });

  it("changes button text when toggled", () => {
    render(<PasswordInput />);
    const toggleButton = screen.getByRole("button");

    screen.getByRole("button", { name: /Show/i });
    fireEvent.click(toggleButton);
    screen.getByRole("button", { name: /Hide/i });
  });

  it("applies custom className", () => {
    render(<PasswordInput className="bg-green-100" />);
    const input = screen.getByLabelText("password");
    expect(input.className.includes("bg-green-100")).toBe(true);
  });

  it("passes through other props to Input component", () => {
    render(
      <PasswordInput
        placeholder="Enter password"
        data-testid="password-input"
      />,
    );
    const input = screen.getByLabelText("password");
    expect(input.getAttribute("placeholder")).toBe("Enter password");
  });

  it("includes style to hide browser password toggles", () => {
    render(<PasswordInput />);
    const input = screen.getByLabelText("password");
    expect(input.className.includes("hide-password-toggle")).toBe(true);
  });

  it("has correct accessibility attributes", () => {
    render(<PasswordInput />);
    const toggleButton = screen.getByRole("button");
    expect(
      screen.getByRole("button", {
        name: /show/i,
      }),
    );
    expect(
      screen.getByText("Show password", { selector: ".sr-only" }),
    ).toBeDefined();

    fireEvent.click(toggleButton);
    expect(
      screen.getByRole("button", {
        name: /hide/i,
      }),
    );
    expect(
      screen.getByText("Hide password", { selector: ".sr-only" }),
    ).toBeDefined();
  });
});
