import { cn } from "@/old/_utils/helpers";
import { Slot } from "@radix-ui/react-slot";
import {
  ForwardedRef,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

const Title = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot> & { asChild?: boolean }
>(({ className, asChild, ...delegated }, ref) => {
  const Comp = asChild ? Slot : "h1";

  return (
    <Comp
      ref={
        ref as typeof asChild extends true
          ? ForwardedRef<HTMLElement>
          : ForwardedRef<HTMLHeadingElement>
      }
      className={cn(
        "font-wurth text-[28px] font-medium leading-8 text-brand-gray-500",
        className,
      )}
      {...delegated}
    />
  );
});
Title.displayName = "Title";

export default Title;
