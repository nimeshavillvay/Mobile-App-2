import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/components/base/atoms/button";
import { Label } from "~/components/base/atoms/label";
import { Textarea } from "./textarea";

const meta: Meta = {
  title: "Base/Atom/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  args: {
    disabled: false,
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Disabled: Story = {
  render: () => <Textarea placeholder="Type your message here." disabled />,
};

export const TextareaWithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  ),
};

export const TextareaWithText: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-muted-foreground text-sm">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
};

export const TextareaWithButton: Story = {
  render: () => (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  ),
};
