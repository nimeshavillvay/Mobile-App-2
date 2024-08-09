import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { Button } from "~/components/base/atoms/button";

import userEvent from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

// Component
const DropdownMenuCheckboxesComponent = () => {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  const [showPanel, setShowPanel] = useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" data-testid="dropdown-trigger">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" data-testid="dropdown-content">
        <DropdownMenuLabel data-testid="dropdown-label">
          Appearance
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Button>Test</Button>
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
          data-testid="status-bar-checkbox"
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
          data-testid="activity-bar-checkbox"
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
          data-testid="panel-checkbox"
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Tests
describe("DropdownMenuCheckboxesComponent", () => {
  test("displays the dropdown on trigger click", async () => {
    const user = userEvent.setup();

    render(<DropdownMenuCheckboxesComponent />);

    const triggerButton = screen.getByRole("button", { name: /open/i });
    await user.click(triggerButton);

    // Wait for the dropdown menu to appear
    const menu = await screen.findByRole("menu");
    const menuItems = screen.getAllByRole("menuitemcheckbox");

    // Assertions for initial state
    expect(triggerButton).toHaveAttribute("aria-expanded", "true");
    expect(menu).toBeInTheDocument();
    expect(menuItems.length).toBe(3); // Number of menu items expected

    // Check initial state of the checkboxes
    expect(
      screen.getByRole("menuitemcheckbox", { name: /status bar/i }),
    ).toHaveAttribute("aria-checked", "true");
    expect(
      screen.getByRole("menuitemcheckbox", { name: /activity bar/i }),
    ).toHaveAttribute("aria-checked", "false");
    expect(
      screen.getByRole("menuitemcheckbox", { name: /panel/i }),
    ).toHaveAttribute("aria-checked", "false");

    // Click the checkbox to check "Panel"
    const panelCheckbox = screen.getByRole("menuitemcheckbox", {
      name: /panel/i,
    });
    await user.click(panelCheckbox);

    // Wait for the menu to close (or use a method to determine menu visibility change)
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    // Reopen the menu
    await user.click(triggerButton);

    // Wait for the dropdown menu to reappear
    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    // Verify that the "Panel" checkbox is still checked
    expect(
      screen.getByRole("menuitemcheckbox", { name: /panel/i }),
    ).toHaveAttribute("aria-checked", "true");
  });
});
