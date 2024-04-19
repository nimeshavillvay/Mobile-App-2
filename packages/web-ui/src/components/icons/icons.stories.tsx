import type { Meta, StoryObj } from "@storybook/react";
import { type ReactNode } from "react";
import AddToCart from "./add-to-cart";
import Alert from "./alert";
import ArrowLeft from "./arrow-left";
import ArrowPathUp from "./arrow-path-up";
import ArrowRight from "./arrow-right";
import ArrowUp from "./arrow-up";
import ArrowUpRight from "./arrow-up-right";
import Bell from "./bell";
import Check from "./check";
import CheckCircle from "./check-circle";
import CheckCircleFilled from "./check-circle-filled";
import ChevronDown from "./chevron-down";
import ChevronLeft from "./chevron-left";
import ChevronRight from "./chevron-right";
import ChevronUp from "./chevron-up";
import Close from "./close";
import Facebook from "./facebook";
import Headset from "./headset";
import HeartFilled from "./heart-filled";
import HeartOutline from "./heart-outline";
import Instagram from "./instagram";
import LinkedIn from "./linkedin";
import MagnifyingGlass from "./magnifying-glass";
import Menu from "./menu";
import Minus from "./minus";
import PackageDelivery from "./package-delivery";
import Pinterest from "./pinterest";
import Plus from "./plus";
import Profile from "./profile";
import Save from "./save";
import Settings from "./settings";
import ShoppingCart from "./shopping-cart";
import TikTok from "./tiktok";
import Truck from "./truck";
import TruckWithClock from "./truck-with-clock";
import Twitter from "./twitter";
import Wallet from "./wallet";
import YouTube from "./youtube";
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

const IconContainer = ({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) => {
  return (
    <li className="ui-flex ui-flex-col ui-items-center">
      {children}{" "}
      <div className="ui-text-center ui-text-sm ui-text-wurth-gray-800">
        {name}
      </div>
    </li>
  );
};

export const Showcase: Story = {
  render: () => {
    return (
      <ul className="ui-grid ui-grid-cols-6 ui-gap-4">
        <IconContainer name="Menu">
          <Menu />
        </IconContainer>

        <IconContainer name="MagnifyingGlass">
          <MagnifyingGlass />
        </IconContainer>

        <IconContainer name="ArrowPathUp">
          <ArrowPathUp />
        </IconContainer>

        <IconContainer name="Wallet">
          <Wallet />
        </IconContainer>

        <IconContainer name="Headset">
          <Headset />
        </IconContainer>

        <IconContainer name="Settings">
          <Settings />
        </IconContainer>

        <IconContainer name="Save">
          <Save />
        </IconContainer>

        <IconContainer name="Alert">
          <Alert />
        </IconContainer>

        <IconContainer name="Minus">
          <Minus />
        </IconContainer>

        <IconContainer name="Plus">
          <Plus />
        </IconContainer>

        <IconContainer name="ShoppingCart">
          <ShoppingCart />
        </IconContainer>

        <IconContainer name="AddToCart">
          <AddToCart />
        </IconContainer>

        <IconContainer name="PackageDelivery">
          <PackageDelivery />
        </IconContainer>

        <IconContainer name="HeartFilled">
          <HeartFilled />
        </IconContainer>

        <IconContainer name="HeartOutline">
          <HeartOutline />
        </IconContainer>

        <IconContainer name="Zap">
          <Zap />
        </IconContainer>

        <IconContainer name="Profile">
          <Profile />
        </IconContainer>

        <IconContainer name="Bell">
          <Bell />
        </IconContainer>

        <IconContainer name="Truck">
          <Truck />
        </IconContainer>

        <IconContainer name="TruckWithClock">
          <TruckWithClock />
        </IconContainer>

        <IconContainer name="Close">
          <Close />
        </IconContainer>

        <IconContainer name="Check">
          <Check />
        </IconContainer>

        <IconContainer name="CheckCircle">
          <CheckCircle />
        </IconContainer>

        <IconContainer name="CheckCircleFilled">
          <CheckCircleFilled />
        </IconContainer>

        <IconContainer name="ArrowUpRight">
          <ArrowUpRight />
        </IconContainer>

        <IconContainer name="ArrowRight">
          <ArrowRight />
        </IconContainer>

        <IconContainer name="ArrowLeft">
          <ArrowLeft />
        </IconContainer>

        <IconContainer name="ArrowUp">
          <ArrowUp />
        </IconContainer>

        <IconContainer name="ChevronRight">
          <ChevronRight />
        </IconContainer>

        <IconContainer name="ChevronDown">
          <ChevronDown />
        </IconContainer>

        <IconContainer name="ChevronLeft">
          <ChevronLeft />
        </IconContainer>

        <IconContainer name="ChevronUp">
          <ChevronUp />
        </IconContainer>

        <IconContainer name="Facebook">
          <Facebook />
        </IconContainer>

        <IconContainer name="Instagram">
          <Instagram />
        </IconContainer>

        <IconContainer name="LinkedIn">
          <LinkedIn />
        </IconContainer>

        <IconContainer name="Twitter">
          <Twitter />
        </IconContainer>

        <IconContainer name="Pinterest">
          <Pinterest />
        </IconContainer>

        <IconContainer name="YouTube">
          <YouTube />
        </IconContainer>

        <IconContainer name="TikTok">
          <TikTok />
        </IconContainer>
      </ul>
    );
  },
};
