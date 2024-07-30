import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "Base/Atom/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Accept terms and condition",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const DefaultLabel: Story = {};
