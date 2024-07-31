import type { Meta, StoryObj } from "@storybook/react";
import QuantityInput from "./quantity-input";

const meta: Meta<typeof QuantityInput> = {
  title: "Molecules/Quantity Input",
  component: QuantityInput,
  tags: ["autodocs"],
  argTypes: {
    minQuantity: { control: "number" },
    maxQuantity: { control: "number" },
    step: { control: "number" },
    initialQuantity: { control: "number" },
    uom: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof QuantityInput>;

export const Default: Story = {
  args: {
    minQuantity: 1,
    maxQuantity: 100,
    step: 1,
    initialQuantity: 1,
    uom: "each",
  },
};

export const CustomRange: Story = {
  args: {
    minQuantity: 5,
    maxQuantity: 50,
    step: 5,
    initialQuantity: 10,
    uom: "each",
  },
};

export const LargeNumbers: Story = {
  args: {
    minQuantity: 100,
    maxQuantity: 1000,
    step: 100,
    initialQuantity: 500,
    uom: "each",
  },
};

export const OverflowingUom: Story = {
  args: {
    minQuantity: 100,
    maxQuantity: 1000,
    step: 100,
    initialQuantity: 500,
    uom: "a bucket full of nails",
  },
};

export const WithLabel: Story = {
  args: {
    minQuantity: 100,
    maxQuantity: 1000,
    step: 100,
    initialQuantity: 500,
    uom: "each",
    showLabel: "Choose amount:",
  },
};

export const DecimalStep: Story = {
  args: {
    minQuantity: 0.1,
    maxQuantity: 5,
    step: 0.1,
    initialQuantity: 1,
    uom: "each",
  },
};

export const CustomClassName: Story = {
  args: {
    ...Default.args,
    className: "bg-gray-100 p-4 rounded-xl",
  },
};
