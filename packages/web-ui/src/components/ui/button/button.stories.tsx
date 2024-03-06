import type { Meta, StoryObj } from "@storybook/react";
import { ShoppingCart } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
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
  args: {
    children: (
      <>
        <ShoppingCart />

        <span>Add to cart</span>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    variant: "default",
    size: "medium",
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.5rem",
          justifyContent: "center",
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="default" size="small">
          <ButtonContent />
        </Button>

        <Button variant="default" size="medium">
          <ButtonContent />
        </Button>

        <Button variant="default" size="large">
          <ButtonContent />
        </Button>

        <Button variant="destructive" size="small">
          <ButtonContent />
        </Button>

        <Button variant="destructive" size="medium">
          <ButtonContent />
        </Button>

        <Button variant="destructive" size="large">
          <ButtonContent />
        </Button>

        <Button variant="outline" size="small">
          <ButtonContent />
        </Button>

        <Button variant="outline" size="medium">
          <ButtonContent />
        </Button>

        <Button variant="outline" size="large">
          <ButtonContent />
        </Button>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <Button variant="default" size="medium" disabled>
          <ButtonContent />
        </Button>

        <Button variant="destructive" size="medium" disabled>
          <ButtonContent />
        </Button>

        <Button variant="outline" size="medium" disabled>
          <ButtonContent />
        </Button>
      </div>
    );
  },
};

const ButtonContent = () => {
  return (
    <>
      <ShoppingCart />
      <span>Add to cart</span>
    </>
  );
};
