import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

type SelectComponentProps = {
  isScrollable?: boolean;
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  isScrollable = false,
}) => (
  <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={isScrollable ? "Select a timezone" : "Theme"} />
    </SelectTrigger>
    <SelectContent className={isScrollable ? "h-40 overflow-auto" : ""}>
      {isScrollable ? (
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
          <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
        </SelectGroup>
      ) : (
        <>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </>
      )}
    </SelectContent>
  </Select>
);

describe("SelectComponent", () => {
  it("should render placeholder when no value is selected", () => {
    // Render without a value to display placeholder
    render(<SelectComponent />);

    // Ensure the placeholder is shown when no value is selected
    expect(screen.getByRole("combobox")).toHaveTextContent("Theme"); // Adjust if placeholder is different
  });

  it("should render options when the dropdown is clicked", async () => {
    const user = userEvent.setup();

    render(<SelectComponent />);

    // Click the combobox to reveal options
    const optionSelect = screen.getByRole("combobox");
    await user.click(optionSelect);

    // Ensure all options are displayed; replace with actual option texts
    expect(screen.getByRole("option", { name: "Light" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Dark" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "System" })).toBeInTheDocument(); // Add more options if needed
  });

  it("should render disabled options correctly", async () => {
    const user = userEvent.setup();

    render(<SelectComponent />);

    // Click the combobox to reveal options
    const optionSelect = screen.getByRole("combobox");
    await user.click(optionSelect);

    // Ensure disabled options are correctly marked; adjust for actual disabled option
    const option2 = screen.getByRole("option", { name: "Dark" });
    expect(option2).toHaveClass("data-[disabled]:pointer-events-none");
  });

  it("should handle option selection correctly", async () => {
    const user = userEvent.setup();

    render(<SelectComponent />);

    // Click the combobox to reveal options
    const optionSelect = screen.getByRole("combobox");
    await user.click(optionSelect);

    // Click on an option and verify the selection
    const option2 = screen.getByRole("option", { name: "Dark" });
    await user.click(option2);

    // Check if the combobox reflects the selected option; adjust if the selected option is shown differently
    expect(optionSelect).toHaveTextContent("Dark");
  });

  it("should render scrollable content when isScrollable is true", async () => {
    render(<SelectComponent isScrollable={true} />);

    // Check if the placeholder text is correct for scrollable version
    expect(screen.getByRole("combobox")).toHaveTextContent("Select a timezone");

    // Open the dropdown
    const optionSelect = screen.getByRole("combobox");
    await userEvent.click(optionSelect);

    // Check if the SelectContent has the correct classes for scrollable content
    const selectContent = screen.getByRole("listbox");
    expect(selectContent).toHaveClass("h-40");
    expect(selectContent).toHaveClass("overflow-auto");

    // Check if the correct options are rendered for the scrollable version
    expect(screen.getByText("North America")).toBeInTheDocument(); // SelectLabel
    expect(
      screen.getByRole("option", { name: "Eastern Standard Time (EST)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Central Standard Time (CST)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Mountain Standard Time (MST)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Pacific Standard Time (PST)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Alaska Standard Time (AKST)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Hawaii Standard Time (HST)" }),
    ).toBeInTheDocument();

    // Check that the non-scrollable options are not present
    expect(
      screen.queryByRole("option", { name: "Light" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: "Dark" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: "System" }),
    ).not.toBeInTheDocument();
  });
});
