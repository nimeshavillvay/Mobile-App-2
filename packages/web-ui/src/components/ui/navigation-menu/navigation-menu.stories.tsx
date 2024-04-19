import { Zap } from "@/components/icons/zap";
import { cn } from "@/lib/utils";
import type { Meta, StoryObj } from "@storybook/react";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuItemLink,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/UI/Navigation Menu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export const Showcase: Story = {
  render: () => {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="ui-grid ui-gap-3 ui-p-4 md:ui-w-[400px] lg:ui-w-[500px] lg:ui-grid-cols-[.75fr_1fr]">
                <li className="ui-row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="ui-from-muted/50 ui-to-muted ui-flex ui-h-full ui-w-full ui-select-none ui-flex-col ui-justify-end ui-rounded-md ui-bg-gradient-to-b ui-p-6 ui-no-underline ui-outline-none focus:ui-shadow-md"
                      href="/"
                    >
                      <Zap className="ui-size-6" />
                      <div className="ui-mb-2 ui-mt-4 ui-text-lg ui-font-medium">
                        shadcn/ui
                      </div>
                      <p className="ui-text-muted-foreground ui-text-sm ui-leading-tight">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="ui-grid ui-w-[400px] ui-gap-3 ui-p-4 md:ui-w-[500px] md:ui-grid-cols-2 lg:ui-w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItemLink href="/">
            Documentation
          </NavigationMenuItemLink>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "hover:ui-bg-accent hover:ui-text-accent-foreground focus:ui-bg-accent focus:ui-text-accent-foreground ui-block ui-select-none ui-space-y-1 ui-rounded-md ui-p-3 ui-leading-none ui-no-underline ui-outline-none ui-transition-colors",
              className,
            )}
            {...props}
          >
            <div className="ui-text-sm ui-font-medium ui-leading-none">
              {title}
            </div>
            <p className="ui-text-muted-foreground ui-line-clamp-2 ui-text-sm ui-leading-snug">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
