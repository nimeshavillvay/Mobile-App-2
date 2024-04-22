import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export type InputProps = ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...delegated }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "ui-flex ui-h-9 ui-w-full ui-rounded-md ui-border ui-border-zinc-200 ui-bg-transparent ui-px-3 ui-py-1 ui-text-sm ui-shadow-sm ui-transition-colors file:ui-border-0 file:ui-bg-transparent file:ui-text-sm file:ui-font-medium placeholder:ui-text-zinc-500 focus-visible:ui-outline-none focus-visible:ui-ring-1 focus-visible:ui-ring-zinc-950 disabled:ui-cursor-not-allowed disabled:ui-opacity-50",
          className,
        )}
        {...delegated}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
