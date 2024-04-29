import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export type InputProps = ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...delegated }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...delegated}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
