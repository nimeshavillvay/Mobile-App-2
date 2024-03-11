import { cva } from "@/lib/cva.config";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "cva";
import { forwardRef } from "react";

const buttonVariants = cva({
  base: "ui-inline-flex ui-items-center ui-justify-center ui-gap-2 ui-whitespace-nowrap ui-rounded-md ui-text-sm ui-font-medium ui-transition-colors focus-visible:ui-outline-none focus-visible:ui-ring-1 focus-visible:ui-ring-zinc-950 disabled:ui-pointer-events-none disabled:ui-opacity-50",
  variants: {
    variant: {
      default:
        "ui-bg-zinc-900 ui-text-zinc-50 ui-shadow hover:ui-bg-zinc-900/90",
      destructive:
        "ui-bg-red-500 ui-text-zinc-50 ui-shadow-sm hover:ui-bg-red-500/90",
      outline:
        "ui-border ui-border-zinc-200 ui-bg-white ui-shadow-sm hover:ui-bg-zinc-100 hover:ui-text-zinc-900",
      secondary:
        "ui-bg-zinc-100 ui-text-zinc-900 ui-shadow-sm hover:ui-bg-zinc-100/80",
      ghost: "hover:ui-bg-zinc-100 hover:ui-text-zinc-900",
      link: "ui-text-zinc-900 ui-underline-offset-4 hover:ui-underline",
    },
    size: {
      default: "ui-h-9 ui-px-4 ui-py-2",
      sm: "ui-h-8 ui-rounded-md ui-px-3 ui-text-xs",
      lg: "ui-h-10 ui-rounded-md ui-px-8",
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
