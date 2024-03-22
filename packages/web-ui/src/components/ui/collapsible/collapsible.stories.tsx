import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Demo: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="ui-w-[350px] ui-space-y-2"
      >
        <div className="ui-flex ui-items-center ui-justify-between ui-space-x-4 ui-px-4">
          <h4 className="ui-text-sm ui-font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="ui-h-4 ui-w-4" />
              <span className="ui-sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="ui-rounded-md ui-border ui-px-4 ui-py-2 ui-font-mono ui-text-sm ui-shadow-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="ui-space-y-2">
          <div className="ui-rounded-md ui-border ui-px-4 ui-py-2 ui-font-mono ui-text-sm ui-shadow-sm">
            @radix-ui/colors
          </div>
          <div className="ui-rounded-md ui-border ui-px-4 ui-py-2 ui-font-mono ui-text-sm ui-shadow-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
