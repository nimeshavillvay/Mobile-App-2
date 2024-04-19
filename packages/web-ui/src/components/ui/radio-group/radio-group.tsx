"use client";

import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("ui-grid ui-gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "ui-aspect-square ui-size-4 ui-rounded-full ui-border ui-border-wurth-gray-250 ui-shadow-sm focus:ui-outline-none focus-visible:ui-ring-1 focus-visible:ui-ring-zinc-950 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 data-[state=checked]:ui-border-wurth-red-650",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="ui-flex ui-items-center ui-justify-center">
        <Circle className="ui-size-2 ui-fill-wurth-red-650 ui-stroke-wurth-red-650" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
