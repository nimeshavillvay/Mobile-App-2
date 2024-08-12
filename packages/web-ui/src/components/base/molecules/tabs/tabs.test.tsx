import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"; // Adjust the import path as needed

describe("Tabs Component", () => {
  it("renders tabs with triggers and content", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    // Check if the first tab trigger is rendered and active by default
    const tab1Trigger = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab1Trigger).toBeDefined();
    expect(tab1Trigger.getAttribute("data-state") == "active");

    // Check if the first tab content is visible by default
    const content1 = screen.getByText("Content 1");
    expect(content1).toBeDefined();

    // Check if the second tab content is not visible by default
    const content2 = screen.queryByText("Content 2");
    expect(content2).toBeNull();

    // Simulate clicking the second tab trigger
    const tab2Trigger = screen.getByRole("tab", { name: "Tab 2" });
    await user.click(tab2Trigger);

    // Check if the second tab content becomes visible
    expect(screen.getByText("Content 2")).toBeDefined();

    // Check if the first tab content is no longer visible
    expect(screen.queryByText("Content 1")).toBeNull();
  });
});
