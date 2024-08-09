import { CaretSortIcon } from "@radix-ui/react-icons";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { Button } from "~/components/base/atoms/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

const CollapsibleTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <CaretSortIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

describe("Collapsible Component", () => {
  it("should show content when trigger button is clicked", async () => {
    render(<CollapsibleTest />);

    // Click the trigger button to open the collapsible
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));

    // Wait for the CollapsibleContent to become visible
    await waitFor(() => {
      expect(screen.getByText("@radix-ui/colors")).toBeVisible();
    });

    await waitFor(() => {
      expect(screen.getByText("@stitches/react")).toBeVisible();
    });
  });

  it("should hide content initially", () => {
    render(<CollapsibleTest />);
    expect(screen.queryByText("@radix-ui/colors")).not.toBeInTheDocument();
    expect(screen.queryByText("@stitches/react")).not.toBeInTheDocument();
  });

  it("should render Collapsible component", () => {
    render(<CollapsibleTest />);
    expect(
      screen.getByText("@peduarte starred 3 repositories"),
    ).toBeInTheDocument();
  });
});
