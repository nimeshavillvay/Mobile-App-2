import { cva } from "@/lib/cva.config";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "cva";
import { forwardRef } from "react";

const buttonVariants = cva({
  base: "ui-inline-flex ui-items-center ui-justify-center ui-gap-2 ui-whitespace-nowrap ui-rounded ui-text-sm ui-font-medium ui-transition-colors focus-visible:ui-outline-none focus-visible:ui-ring-1 focus-visible:ui-ring-zinc-950 disabled:ui-pointer-events-none disabled:ui-opacity-50",
  variants: {
    variant: {
      default: "ui-bg-black ui-text-white ui-shadow hover:ui-bg-wurth-gray-800",
      secondary:
        "ui-bg-wurth-red-650 ui-text-white ui-shadow-sm hover:ui-bg-red-800",
      destructive:
        "ui-bg-orange-600 ui-text-white ui-shadow-sm hover:ui-bg-orange-700",
      outline:
        "ui-border ui-border-wurth-gray-400 ui-bg-white ui-text-wurth-gray-800 hover:ui-border-wurth-gray-800 hover:ui-bg-wurth-gray-50",
      subtle: "ui-bg-wurth-gray-50 ui-text-black hover:ui-bg-wurth-gray-150",
      ghost: "ui-text-black hover:ui-bg-wurth-gray-50",
      link: "ui-text-black hover:ui-text-red-800 hover:ui-underline",
    },
    size: {
      default: "ui-h-9 ui-px-4 ui-py-2",
      sm: "ui-h-8 ui-rounded ui-px-3 ui-text-xs",
      lg: "ui-h-10 ui-rounded ui-px-8",
      icon: "ui-h-9 ui-w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
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
