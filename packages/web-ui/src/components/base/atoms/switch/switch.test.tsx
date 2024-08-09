import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Label } from "~/components/base/atoms/label";
import { Switch } from "./switch";

describe("Switch Component", () => {
  it("renders correctly with default props", () => {
    render(
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>,
    );

    // Check if the switch and label are rendered
    const switchElement = screen.getByRole("switch");
    const labelElement = screen.getByText("Airplane Mode");

    expect(switchElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("for", "airplane-mode");
  });

  it("toggles state when clicked", () => {
    render(
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>,
    );

    // Get the switch element
    const switchElement = screen.getByRole("switch");

    // Verify initial state (assuming default is unchecked)
    expect(switchElement).not.toBeChecked();

    // Simulate click to toggle state
    fireEvent.click(switchElement);

    // Verify state after click
    expect(switchElement).toBeChecked();

    // Simulate another click to toggle back
    fireEvent.click(switchElement);

    // Verify state after second click
    expect(switchElement).not.toBeChecked();
  });

  it("has the correct aria attributes", () => {
    render(
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>,
    );

    const switchElement = screen.getByRole("switch");

    // Verify aria attributes
    expect(switchElement).toHaveAttribute("role", "switch");
    expect(switchElement).toHaveAttribute("aria-checked", "false"); // Default unchecked state
  });

  it("updates aria-checked attribute when toggled", () => {
    render(
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>,
    );

    const switchElement = screen.getByRole("switch");

    // Check initial aria-checked attribute
    expect(switchElement).toHaveAttribute("aria-checked", "false");

    // Simulate click to toggle state
    fireEvent.click(switchElement);

    // Verify aria-checked attribute after click
    expect(switchElement).toHaveAttribute("aria-checked", "true");

    // Simulate another click to toggle back
    fireEvent.click(switchElement);

    // Verify aria-checked attribute after second click
    expect(switchElement).toHaveAttribute("aria-checked", "false");
  });
});
