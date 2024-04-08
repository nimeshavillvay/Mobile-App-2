"use client";

import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "ui- ui-fixed ui-inset-0 ui-z-50 ui-bg-black/80 data-[state=open]:ui-animate-in data-[state=closed]:ui-animate-out data-[state=closed]:ui-fade-out-0 data-[state=open]:ui-fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "ui-fixed ui-left-[50%] ui-top-[50%] ui-z-50 ui-grid ui-w-full ui-max-w-lg ui-translate-x-[-50%] ui-translate-y-[-50%] ui-gap-4 ui-border ui-border-zinc-200 ui-bg-white ui-p-6 ui-shadow-lg ui-duration-200 data-[state=open]:ui-animate-in data-[state=closed]:ui-animate-out data-[state=closed]:ui-fade-out-0 data-[state=open]:ui-fade-in-0 data-[state=closed]:ui-zoom-out-95 data-[state=open]:ui-zoom-in-95 data-[state=closed]:ui-slide-out-to-left-1/2 data-[state=closed]:ui-slide-out-to-top data-[state=open]:ui-slide-in-from-left-1/2 data-[state=open]:ui-slide-in-from-top sm:ui-rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="ui-absolute ui-right-4 ui-top-4 ui-rounded-sm ui-opacity-70 ui-ring-offset-white ui-transition-opacity hover:ui-opacity-100 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-zinc-950 focus:ui-ring-offset-2 disabled:ui-pointer-events-none data-[state=open]:ui-bg-zinc-100 data-[state=open]:ui-text-zinc-500">
        <Cross2Icon className="ui-h-4 ui-w-4" />
        <span className="ui-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "ui-flex ui-flex-col ui-space-y-1.5 ui-text-center sm:ui-text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "ui-text-lg ui-font-semibold ui-leading-none ui-tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("ui-text-sm ui-text-zinc-500", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};