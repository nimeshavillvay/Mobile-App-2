"use client";

import { cva, type VariantProps } from "@/lib/cva.config";
import { cn } from "@/lib/utils";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = forwardRef<
  ElementRef<typeof SheetPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "ui- ui-fixed ui-inset-0 ui-z-50 ui-bg-black/80 data-[state=open]:ui-animate-in data-[state=closed]:ui-animate-out data-[state=closed]:ui-fade-out-0 data-[state=open]:ui-fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva({
  base: "ui-fixed ui-z-50 ui-gap-4 ui-bg-white ui-p-6 ui-shadow-lg ui-transition ui-ease-in-out data-[state=closed]:ui-duration-300 data-[state=open]:ui-duration-500 data-[state=open]:ui-animate-in data-[state=closed]:ui-animate-out",
  variants: {
    side: {
      top: "ui-inset-x-0 ui-top-0 ui-border-b data-[state=closed]:ui-slide-out-to-top data-[state=open]:ui-slide-in-from-top",
      bottom:
        "ui-inset-x-0 ui-bottom-0 ui-border-t data-[state=closed]:ui-slide-out-to-bottom data-[state=open]:ui-slide-in-from-bottom",
      left: "ui-inset-y-0 ui-left-0 ui-h-full ui-w-3/4 ui-border-r data-[state=closed]:ui-slide-out-to-left data-[state=open]:ui-slide-in-from-left sm:ui-max-w-sm",
      right:
        "ui-inset-y-0 ui-right-0 ui-h-full ui-w-3/4 ui-border-l data-[state=closed]:ui-slide-out-to-right data-[state=open]:ui-slide-in-from-right sm:ui-max-w-sm",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = forwardRef<
  ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="ui-absolute ui-right-4 ui-top-4 ui-rounded-sm ui-opacity-70 ui-ring-offset-white ui-transition-opacity hover:ui-opacity-100 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-zinc-950 focus:ui-ring-offset-2 disabled:ui-pointer-events-none data-[state=open]:ui-bg-zinc-100">
        <Cross2Icon className="ui-h-4 ui-w-4" />
        <span className="ui-sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "ui-flex ui-flex-col ui-space-y-2 ui-text-center sm:ui-text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "ui-flex ui-flex-col-reverse sm:ui-flex-row sm:ui-justify-end sm:ui-space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = forwardRef<
  ElementRef<typeof SheetPrimitive.Title>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("ui-text-lg ui-font-semibold ui-text-zinc-950", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = forwardRef<
  ElementRef<typeof SheetPrimitive.Description>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("ui-text-sm ui-text-zinc-500", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
