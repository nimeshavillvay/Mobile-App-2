import type { Meta, StoryObj } from "@storybook/react";
import { Loader2 } from "lucide-react";
import { ChevronRight } from "~/components/icons/chevron-right";
import { Email } from "~/components/icons/email";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Base/Atom/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    controls: {
      exclude: /(children|asChild)/g,
    },
  },

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const DefaultButton: Story = {
  args: {
    variant: "default",
    size: "default",
    disabled: false,
  },
  render: () => {
    return <Button>Button</Button>;
  },
};

export const SecondaryButton: Story = {
  render: () => {
    return <Button variant="secondary">Secondary</Button>;
  },
};

export const DestructiveButton: Story = {
  render: () => {
    return <Button variant="destructive">Destructive</Button>;
  },
};

export const OutlineButton: Story = {
  render: () => {
    return <Button variant="outline">Outline</Button>;
  },
};

export const GhostButton: Story = {
  render: () => {
    return <Button variant="ghost">Ghost</Button>;
  },
};

export const ButtonWithIcon: Story = {
  render: () => {
    return (
      <Button>
        <Email className="h-4 w-4 fill-white" /> Login with Email
      </Button>
    );
  },
};

export const ButtonIcon: Story = {
  render: () => {
    return (
      <Button variant="outline" size="icon">
        <ChevronRight className="h-4 w-4" />
      </Button>
    );
  },
};

export const LoadingButton: Story = {
  render: () => {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    );
  },
};

export const LinkButton: Story = {
  render: () => {
    return <Button variant="link">Link</Button>;
  },
};
