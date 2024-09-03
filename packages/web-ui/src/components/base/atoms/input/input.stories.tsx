import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/components/base/atoms/button";
import { Label } from "~/components/base/atoms/label";
import { Input } from "./input";

const meta: Meta = {
  title: "Base/Atom/Input",
  component: Input,
  parameters: {
    layout: "centered",
    controls: {
      exclude: /(onClick)/g,
    },
  },
  args: {
    disabled: false,
    mask: "",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {};

export const EmailInput: Story = {
  render: () => <Input type="email" placeholder="Email" />,
};
export const PasswordInput: Story = {
  render: () => <Input type="password" placeholder="Password" />,
};

export const FileInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  ),
};

export const NumberInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Number</Label>
      <Input id="picture" type="number" />
    </div>
  ),
};

export const DisabledInput: Story = {
  render: () => <Input disabled type="email" placeholder="Disabled" />,
};

export const InputWithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const InputWithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
};

export const CreditCardInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="credit-card">Credit Card</Label>
      <Input
        id="credit-card"
        type="text"
        placeholder="1234 5678 9012 3456"
        mask="____ ____ ____ ____"
        replacement={{ _: /\d/ }}
      />
    </div>
  ),
};

export const CustomPatternInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="custom">Custom Pattern (AA-1234)</Label>
      <Input
        id="custom"
        type="text"
        placeholder="AB-1234"
        mask="AA-____"
        replacement={{ A: /[A-Z]/, _: /\d/ }}
      />
    </div>
  ),
};
