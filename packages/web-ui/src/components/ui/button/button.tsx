import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "cva";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva } from "../../../lib/cva.config";
import { cn } from "../../../lib/utils";

const buttonVariants = cva({
  base: "ui-inline-flex ui-items-center ui-justify-center ui-whitespace-nowrap ui-text-sm ui-font-semibold ui-border-2 disabled:ui-pointer-events-none disabled:ui-opacity-50",
  variants: {
    variant: {
      default:
        "ui-bg-black ui-border-black hover:ui-bg-zinc-800 hover:ui-border-zinc-800 focus:ui-bg-zinc-800 focus:ui-border-black ui-text-white",
      destructive:
        "ui-bg-red-650 ui-border-red-650 hover:ui-bg-red-800 hover:ui-border-red-800 focus:ui-bg-red-800 focus:ui-border-[#0E0E13]/25 ui-text-white",
      outline:
        "ui-bg-white ui-border-[#0E0E13]/[8%] hover:ui-bg-zinc-100 hover:ui-border-[#0E0E13]/15 focus:ui-border-[#0E0E13]/50 focus:ui-bg-zinc-100 ui-text-zinc-950",
    },
    size: {
      small: "ui-rounded-lg ui-py-3 ui-px-4 ui-gap-2",
      medium: "ui-rounded-lg ui-py-3 ui-px-6 ui-gap-3",
      large: "ui-rounded-xl ui-py-4 ui-px-8 ui-gap-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "medium",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
