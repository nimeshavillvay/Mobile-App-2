"use client";

import { cva, type VariantProps } from "@/lib/cva.config";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as ToastPrimitives from "@radix-ui/react-toast";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactElement,
} from "react";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitives.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "ui-fixed ui-top-0 ui-z-[100] ui-flex ui-max-h-screen ui-w-full ui-flex-col-reverse ui-p-4 sm:ui-bottom-0 sm:ui-right-0 sm:ui-top-auto sm:ui-flex-col md:ui-max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva({
  base: "data-[state=open]:ui-animate-in data-[state=closed]:ui-animate-out data-[swipe=end]:ui-animate-out data-[state=closed]:ui-fade-out-80 data-[state=closed]:ui-slide-out-to-right-full data-[state=open]:ui-slide-in-from-top-full data-[state=open]:sm:ui-slide-in-from-bottom-full ui-group ui-pointer-events-auto ui-relative ui-flex ui-w-full ui-items-center ui-justify-between ui-space-x-2 ui-overflow-hidden ui-rounded-md ui-border ui-border-zinc-200 ui-p-4 ui-pr-6 ui-shadow-lg ui-transition-all data-[swipe=cancel]:ui-translate-x-0 data-[swipe=end]:ui-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:ui-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:ui-transition-none",
  variants: {
    variant: {
      default: "ui-border ui-bg-white ui-text-zinc-950",
      destructive:
        "ui-destructive ui-group ui-border-red-500 ui-bg-red-500 ui-text-zinc-50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Toast = forwardRef<
  ElementRef<typeof ToastPrimitives.Root>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = forwardRef<
  ElementRef<typeof ToastPrimitives.Action>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "ui-inline-flex ui-h-8 ui-shrink-0 ui-items-center ui-justify-center ui-rounded-md ui-border ui-border-zinc-200 ui-bg-transparent ui-px-3 ui-text-sm ui-font-medium ui-transition-colors hover:ui-bg-zinc-100 focus:ui-outline-none focus:ui-ring-1 focus:ui-ring-zinc-950 disabled:ui-pointer-events-none disabled:ui-opacity-50 group-[.destructive]:ui-border-zinc-100/40 group-[.destructive]:hover:ui-border-red-500/30 group-[.destructive]:hover:ui-bg-red-500 group-[.destructive]:hover:ui-text-zinc-50 group-[.destructive]:focus:ui-ring-red-500",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = forwardRef<
  ElementRef<typeof ToastPrimitives.Close>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "ui-absolute ui-right-1 ui-top-1 ui-rounded-md ui-p-1 ui-text-zinc-950/50 ui-opacity-0 ui-transition-opacity hover:ui-text-zinc-950 focus:ui-opacity-100 focus:ui-outline-none focus:ui-ring-1 group-hover:ui-opacity-100 group-[.destructive]:ui-text-red-300 group-[.destructive]:hover:ui-text-red-50 group-[.destructive]:focus:ui-ring-red-400 group-[.destructive]:focus:ui-ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <Cross2Icon className="ui-h-4 ui-w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = forwardRef<
  ElementRef<typeof ToastPrimitives.Title>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("ui-text-sm ui-font-semibold [&+div]:ui-text-xs", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = forwardRef<
  ElementRef<typeof ToastPrimitives.Description>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("ui-text-sm ui-opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
};
