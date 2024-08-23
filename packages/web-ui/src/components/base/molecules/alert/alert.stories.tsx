import type { Meta, StoryObj } from "@storybook/react";
import { TriangleAlert } from "lucide-react";
import { Zap } from "~/components/icons/zap";
import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Base/Molecules/Alert",
  component: Alert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const DefaultAlert: Story = {
  render: () => {
    return (
      <Alert>
        <Zap className="size-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    return (
      <Alert variant="destructive">
        <TriangleAlert size={16} />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    );
  },
};

export const DefaultWithoutDescription: Story = {
  render: () => {
    return (
      <Alert>
        <Zap className="size-4" />
        <AlertTitle>Heads up!</AlertTitle>
      </Alert>
    );
  },
};

export const DestructiveWithoutDescription: Story = {
  render: () => {
    return (
      <Alert variant="destructive">
        <TriangleAlert size={16} />
        <AlertTitle>Error</AlertTitle>
      </Alert>
    );
  },
};
