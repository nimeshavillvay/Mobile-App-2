"use client";

import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { ComponentProps } from "react";

const Checkbox = ({
  className = "",
  ...delegated
}: ComponentProps<typeof CheckboxPrimitive.Root>) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "ui-peer ui-size-3.5 ui-shrink-0 ui-rounded-sm ui-border ui-border-wurth-gray-250 ui-shadow focus-visible:ui-outline-none focus-visible:ui-ring-1 focus-visible:ui-ring-wurth-gray-800 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 data-[state=checked]:ui-bg-wurth-gray-800 data-[state=checked]:ui-text-wurth-gray-50",
        className,
      )}
      {...delegated}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "ui-flex ui-items-center ui-justify-center ui-text-current",
        )}
      >
        <CheckIcon className="ui-size-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export { Checkbox };
