"use client";

import ChevronDown from "@/components/icons/chevron-down";
import { cva } from "@/lib/cva.config";
import { cn } from "@/lib/utils";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

const NavigationMenu = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Root>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "ui-relative ui-z-10 ui-flex ui-max-w-max ui-flex-1 ui-items-center ui-justify-center ui-bg-wurth-red-650",
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.List>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "ui-group ui-flex ui-flex-1 ui-list-none ui-items-center ui-justify-center",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva({
  base: "data-[state=open]:ui-bg-g-wurth-red-65050 ui-group ui-inline-flex ui-w-max ui-items-center ui-justify-center ui-gap-1 ui-bg-wurth-red-650 ui-px-5 ui-py-3 ui-text-base ui-font-semibold ui-text-white ui-transition-colors hover:ui-bg-red-700 focus:ui-bg-red-700 focus:ui-outline-none disabled:ui-pointer-events-none disabled:ui-opacity-50 data-[active]:ui-bg-wurth-red-650/50",
});

const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "ui-group", className)}
    {...props}
  >
    {children}
    {""}
    <ChevronDown
      className="ui-size-3 ui-stroke-white ui-stroke-2 ui-transition ui-duration-300 group-data-[state=open]:ui-rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "ui-left-0 ui-top-0 ui-w-full data-[motion^=from-]:ui-animate-in data-[motion^=to-]:ui-animate-out data-[motion^=from-]:ui-fade-in data-[motion^=to-]:ui-fade-out data-[motion=from-end]:ui-slide-in-from-right-52 data-[motion=from-start]:ui-slide-in-from-left-52 data-[motion=to-end]:ui-slide-out-to-right-52 data-[motion=to-start]:ui-slide-out-to-left-52 md:ui-absolute md:ui-w-auto",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "ui-absolute ui-left-0 ui-top-full ui-flex ui-justify-center",
    )}
  >
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "ui-origin-top-center ui-relative ui-mt-1.5 ui-h-[var(--radix-navigation-menu-viewport-height)] ui-w-full ui-overflow-hidden ui-rounded-md ui-border ui-border-zinc-200 ui-bg-white ui-text-zinc-950 ui-shadow data-[state=open]:ui-animate-in data-[state=closed]:ui-animate-out data-[state=closed]:ui-zoom-out-95 data-[state=open]:ui-zoom-in-90 md:ui-w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "ui-top-full ui-z-[1] ui-flex ui-h-1.5 ui-items-end ui-justify-center ui-overflow-hidden data-[state=visible]:ui-animate-in data-[state=hidden]:ui-animate-out data-[state=hidden]:ui-fade-out data-[state=visible]:ui-fade-in",
      className,
    )}
    {...props}
  >
    <div className="ui-relative ui-top-[60%] ui-h-2 ui-w-2 ui-rotate-45 ui-rounded-tl-sm ui-bg-zinc-200 ui-shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

const NavigationMenuItemLink = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Link>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...delegated }, ref) => (
  <NavigationMenuItem>
    <NavigationMenuLink
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), className)}
      {...delegated}
    />
  </NavigationMenuItem>
));
NavigationMenuItemLink.displayName = "NavigationMenuItemLink";

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuItemLink,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
