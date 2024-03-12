import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ui-flex ui-h-9 ui-w-full ui-rounded-md ui-border ui-border-zinc-200 ui-bg-transparent ui-px-3 ui-py-1 ui-text-sm ui-shadow-sm ui-transition-colors file:ui-border-0 file:ui-bg-transparent file:ui-text-sm file:ui-font-medium placeholder:ui-text-zinc-500 focus-visible:ui-outline-none focus-visible:ui-ring-1 focus-visible:ui-ring-zinc-950 disabled:ui-cursor-not-allowed disabled:ui-opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
