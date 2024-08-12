import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Base/Molecules/Progress",
  component: Progress,
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
    className: {
      control: "text",
    },
  },
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
    className: "w-96",
  },
};

export const ProgressZero: Story = {
  args: {
    value: 0,
    className: "w-96",
  },
};

export const ProgressFull: Story = {
  args: {
    value: 100,
    className: "w-96",
  },
};
