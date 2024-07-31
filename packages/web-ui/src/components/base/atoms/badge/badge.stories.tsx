import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Base/Atom/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    controls: {
      exclude: /(onClick)/g,
    },
  },
  args: {
    children: "Badge",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const DefaultBadge: Story = {};

export const DefaultBadgeAlt: Story = {
  args: {
    variant: "default-alt",
  },
};

export const PrimaryBadge: Story = {
  args: {
    variant: "primary",
  },
};

export const PrimaryBadgeAlt: Story = {
  args: {
    variant: "primary-alt",
  },
};

export const OutlineBadge: Story = {
  args: {
    variant: "outline",
  },
};

export const SuccessBadge: Story = {
  args: {
    variant: "success",
  },
};

export const SuccessBadgeAlt: Story = {
  args: {
    variant: "success-alt",
  },
};

export const WarningBadge: Story = {
  args: {
    variant: "warning",
  },
};

export const WarningBadgeAlt: Story = {
  args: {
    variant: "warning-alt",
  },
};
