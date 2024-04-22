"use client";

import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { type ComponentProps } from "react";

const RadioGroup = ({
  className = "",
  ...delegated
}: ComponentProps<typeof RadioGroupPrimitive.Root>) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("ui-grid ui-gap-2", className)}
      {...delegated}
    />
  );
};

const RadioGroupItem = ({
  className = "",
  ...delegated
}: ComponentProps<typeof RadioGroupPrimitive.Item>) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "ui-aspect-square ui-size-4 ui-rounded-full ui-border ui-border-wurth-gray-250 ui-shadow-sm focus:ui-outline-none focus-visible:ui-ring-1 focus-visible:ui-ring-zinc-950 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 data-[state=checked]:ui-border-wurth-red-650",
        className,
      )}
      {...delegated}
    >
      <RadioGroupPrimitive.Indicator className="ui-flex ui-items-center ui-justify-center">
        <Circle className="ui-size-2 ui-fill-wurth-red-650 ui-stroke-wurth-red-650" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
};

export { RadioGroup, RadioGroupItem };
