import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/components/base/atom/button";
import { Label } from "~/components/base/atom/label";
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
