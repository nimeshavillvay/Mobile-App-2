import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Label } from "~/components/base/atoms/label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup Component", () => {
  const renderRadioGroup = () => {
    return render(
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>,
    );
  };

  it("should render RadioGroup with correct structure", () => {
    renderRadioGroup();

    // Check if all RadioGroupItem labels are rendered
    expect(screen.getByLabelText("Default")).toBeInTheDocument();
    expect(screen.getByLabelText("Comfortable")).toBeInTheDocument();
    expect(screen.getByLabelText("Compact")).toBeInTheDocument();
  });

  it("should render all RadioGroupItems with correct text", () => {
    renderRadioGroup();

    // Check if all RadioGroupItems are rendered and have correct text
    const items = screen.getAllByRole("radio");
    expect(items).toHaveLength(3);
    expect(screen.getByLabelText("Default")).toBeInTheDocument();
    expect(screen.getByLabelText("Comfortable")).toBeInTheDocument();
    expect(screen.getByLabelText("Compact")).toBeInTheDocument();
  });

  it("should select the correct RadioGroupItem when clicked", () => {
    renderRadioGroup();

    // Click on the "Compact" radio button
    fireEvent.click(screen.getByLabelText("Compact"));

    // Ensure "Compact" radio button is selected
    expect(screen.getByLabelText("Compact")).toBeChecked();

    // Ensure other radio buttons are not selected
    expect(screen.getByLabelText("Default")).not.toBeChecked();
    expect(screen.getByLabelText("Comfortable")).not.toBeChecked();
  });

  it("should have default value selected", () => {
    renderRadioGroup();

    // Ensure "Comfortable" radio button is selected by default
    expect(screen.getByLabelText("Comfortable")).toBeChecked();
  });
});
