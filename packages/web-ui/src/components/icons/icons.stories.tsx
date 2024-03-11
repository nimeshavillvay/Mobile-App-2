import type { Meta, StoryObj } from "@storybook/react";
import { AddToCart, HeartFilled, HeartOutline } from "./icons";

const Icon = () => {
  return <svg></svg>;
};

const meta: Meta<typeof Icon> = {
  title: "Components/Icons",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Showcase: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gap: "1rem",
        }}
      >
        <AddToCart />

        <HeartFilled />

        <HeartOutline />
      </div>
    );
  },
};
