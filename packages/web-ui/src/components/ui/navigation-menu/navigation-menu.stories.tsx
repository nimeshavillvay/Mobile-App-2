import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
// import { NavigationMenuLinksList } from "./navigation-menu-links-list";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/UI/Navigation Menu",
  component: NavigationMenu,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

// const categoriesList = [
//   {
//     name: "Cabinet Hinges and Lift Systems",
//     link: "/cabinet-hinges-and-lift-systems",
//   },
//   {
//     name: "Drawer Slides and Construction Systems",
//     link: "/drawer-slides-and-construction-systems",
//   },
//   {
//     name: "Decorative Hardware",
//     link: "/drawer-slides-and-construction-systems",
//   },
//   {
//     name: "Kitchen Solutions",
//     link: "/kitchen-solutions",
//   },
//   {
//     name: "Bathroom Solutions",
//     link: "/bathroom-solutions",
//   },
//   {
//     name: "Closet Solutions",
//     link: "/closet-solutions",
//   },
//   {
//     name: "Lighting",
//     link: "/lighting",
//   },
//   {
//     name: "Furniture Hardware",
//     link: "/furniture-hardware",
//   },
//   {
//     name: "Tools and Woodworking Essentials",
//     link: "/tools-and-woodworking-essentials",
//   },
//   {
//     name: "Finish Room Supplies and Accessories",
//     link: "/finish-room-supplies-and-accessories",
//   },
//   {
//     name: "Laminate and Surface Products",
//     link: "/laminate-and-surface-products",
//   },
//   {
//     name: "Faucets, Sinks and Plumbing",
//     link: "/faucets-sinks-and-plumbing",
//   },
// ];

export const Example: Story = {
  render: () => {
    return (
      <NavigationMenu value="Cat">
        <NavigationMenuList>
          <NavigationMenuItem value="Cat">
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link href="/deals">Deals</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Shop by Brand</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link href="/laminate-finder">Laminate Finder</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link href="/quick-order">Quick Order</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenu>
    );
  },
};
