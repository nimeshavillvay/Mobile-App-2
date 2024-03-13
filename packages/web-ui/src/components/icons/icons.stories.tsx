import type { Meta, StoryObj } from "@storybook/react";
import AddToCart from "./add-to-cart";
import Bell from "./bell";
import HeartFilled from "./heart-filled";
import HeartOutline from "./heart-outline";
import MagnifyingGlass from "./magnifying-glass";
import Menu from "./menu";
import Profile from "./profile";
import ShoppingCart from "./shopping-cart";

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
        <Menu />

        <MagnifyingGlass />

        <ShoppingCart />

        <AddToCart />

        <HeartFilled />

        <HeartOutline />

        <Profile />

        <Bell />
      </div>
    );
  },
};
