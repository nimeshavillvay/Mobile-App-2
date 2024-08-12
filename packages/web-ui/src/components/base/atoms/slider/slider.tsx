"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { cn } from "~/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-1.5 w-full grow overflow-hidden rounded-full",
        "bg-black dark:bg-zinc-300",
      )}
    >
      <SliderPrimitive.Range
        className={cn(
          "absolute h-full transition-colors",

          "bg-zinc-200 data-[state=checked]:bg-gray-400",
          "dark:bg-black dark:data-[state=checked]:bg-gray-600",
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full border border-black bg-white shadow transition-colors",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black",
        "dark:border-white dark:bg-black dark:focus-visible:ring-white",
        "data-[state=checked]:bg-gray-500",
        "dark:data-[state=checked]:bg-gray-700",
        "disabled:pointer-events-none disabled:opacity-50",
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
