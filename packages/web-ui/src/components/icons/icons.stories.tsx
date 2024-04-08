import type { Meta, StoryObj } from "@storybook/react";
import AddToCart from "./add-to-cart";
import ArrowLeft from "./arrow-left";
import ArrowRight from "./arrow-right";
import ArrowUp from "./arrow-up";
import ArrowUpRight from "./arrow-up-right";
import Bell from "./bell";
import Check from "./check";
import ChevronDown from "./chevron-down";
import ChevronLeft from "./chevron-left";
import ChevronRight from "./chevron-right";
import ChevronUp from "./chevron-up";
import Close from "./close";
import HeartFilled from "./heart-filled";
import HeartOutline from "./heart-outline";
import MagnifyingGlass from "./magnifying-glass";
import Menu from "./menu";
import Minus from "./minus";
import Plus from "./plus";
import Profile from "./profile";
import Save from "./save";
import Settings from "./settings";
import ShoppingCart from "./shopping-cart";
import Truck from "./truck";
import Zap from "./zap";

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

        <Settings />

        <Save />

        <Minus />

        <Plus />

        <ShoppingCart />

        <AddToCart />

        <HeartFilled />

        <HeartOutline />

        <Zap />

        <Profile />

        <Bell />

        <Truck />

        <Close />

        <Check />

        <ArrowUpRight />

        <ArrowRight />

        <ArrowLeft />

        <ArrowUp />

        <ChevronRight />

        <ChevronDown />

        <ChevronLeft />

        <ChevronUp />
      </div>
    );
  },
};
