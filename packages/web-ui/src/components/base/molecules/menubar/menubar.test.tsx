import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./menubar"; // Adjust the import path as needed

describe("Menubar Component", () => {
  it("renders menubar with trigger and menu items", async () => {
    const user = userEvent.setup();
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Menu</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Item 1</MenubarItem>
            <MenubarItem>Item 2</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    // Check if the trigger is rendered
    const trigger = screen.getByRole("menuitem", { name: "Menu" });
    expect(trigger).toBeDefined();

    // Check if the content is not visible initially
    const item1 = screen.queryByText("Item 1");
    expect(item1).toBeNull();

    // Simulate clicking the trigger
    await user.click(trigger);

    // Check if the content becomes visible
    expect(screen.getByRole("menuitem", { name: "Item 1" })).toBeDefined();
    expect(screen.getByRole("menuitem", { name: "Item 2" })).toBeDefined();
  });

  it("renders menubar with trigger and nested menu items and sub items", async () => {
    const user = userEvent.setup();
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Menu</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Item 1</MenubarItem>
            <MenubarItem>Item 2</MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    // Check if the trigger is rendered
    const trigger = screen.getByRole("menuitem", { name: "Menu" });
    expect(trigger).toBeDefined();

    // Check if the content is not visible initially
    const itemShare = screen.queryByText("Share");
    expect(itemShare).toBeNull();

    // Simulate clicking the trigger
    await user.click(trigger);

    // Check if the share menu item becomes visible
    const shareTrigger = screen.getByRole("menuitem", { name: "Share" });
    expect(shareTrigger).toBeDefined();
    await user.click(shareTrigger);
    expect(screen.getByRole("menuitem", { name: "Email link" })).toBeDefined();
    expect(screen.getByRole("menuitem", { name: "Messages" })).toBeDefined();
    expect(screen.getByRole("menuitem", { name: "Notes" })).toBeDefined();
  });

  it("handles item click", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Menu</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={onClick}>Item 1</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    // Simulate clicking the trigger to open the menu
    await user.click(screen.getByText("Menu"));

    // Simulate clicking on the menu item
    fireEvent.click(screen.getByText("Item 1"));

    // Check if the onClick handler was called
    expect(onClick).toHaveBeenCalled();
  });
});
