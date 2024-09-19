"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "~/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-zinc-900 data-[state=unchecked]:bg-zinc-200",
      "dark:data-[state=checked]:bg-zinc-200 dark:data-[state=unchecked]:bg-zinc-900",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform",
        "bg-white data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        "dark:data-[state=checked]:translate-x-4 dark:data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-zinc-900 dark:data-[state=unchecked]:bg-zinc-200",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };