import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "Components/UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Showcase: Story = {
  render: () => {
    return (
      <div>
        <div className="ui-space-y-1">
          <h4 className="ui-text-sm ui-font-medium ui-leading-none">
            Radix Primitives
          </h4>
          <p className="ui-text-sm ui-text-gray-600">
            An open-source UI component library.
          </p>
        </div>
        <Separator className="ui-my-4" />
        <div className="ui-flex ui-h-5 ui-items-center ui-space-x-4 ui-text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    );
  },
};
