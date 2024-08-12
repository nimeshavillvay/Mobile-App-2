import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "~/components/base/atoms/label";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Base/Atom/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const CheckboxWithLabels: Story = {
  render: (props) => {
    const id = "checkbox";

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <Checkbox id={id} {...props} />

        <Label htmlFor={id}>Accept terms and condition</Label>
      </div>
    );
  },
};

export const CheckboxWithoutLabels: Story = {};

export const DisabledCheckbox: Story = {
  render: () => {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" disabled />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    );
  },
};
