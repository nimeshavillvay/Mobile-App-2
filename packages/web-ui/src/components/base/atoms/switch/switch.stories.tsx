// Slider.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "~/components/base/atoms/label";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Base/Atom/Switch", // The title under which the story will appear in Storybook
  component: Switch,
  parameters: {
    layout: "centered", // Center the component in the Storybook canvas
  },
  tags: ["autodocs"], // Optional: for automatic documentation generation
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};
