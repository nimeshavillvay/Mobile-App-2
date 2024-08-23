import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./password-input";

const meta: Meta<typeof PasswordInput> = {
  title: "Base/Molecules/PasswordInput",
  component: PasswordInput,
  argTypes: {
    className: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter password",
  },
};

export const WithClassName: Story = {
  args: {
    placeholder: "Enter password",
    className: "border-2 border-blue-500",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Enter password",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Enter password",
    value: "password123",
  },
};

export const WithCustomWidth: Story = {
  args: {
    placeholder: "Enter password",
    className: "w-64",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Enter password",
    className: "border-red-500",
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div>
      <label htmlFor="password" className="mb-2 block">
        Password:
      </label>
      <PasswordInput id="password" {...args} />
    </div>
  ),
  args: {
    placeholder: "Enter password",
  },
};
