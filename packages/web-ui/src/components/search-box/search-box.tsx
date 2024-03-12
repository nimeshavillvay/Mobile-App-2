import MagnifyingGlass from "@/components/icons/magnifying-glass";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

export const SearchBox = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "ui-border-wurth-gray-250 ui-flex ui-w-full ui-flex-row ui-items-center ui-rounded-full ui-border",
        className,
      )}
      {...delegated}
    />
  );
};

export const SearchBoxInput = ({
  className,
  ...delegated
}: ComponentProps<"input">) => {
  return (
    <input
      className={cn(
        "ui-flex-1 ui-rounded-l-full ui-border-0 ui-py-2.5 ui-pl-3.5 ui-text-sm placeholder:ui-text-wurth-gray-400",
        className,
      )}
      {...delegated}
    />
  );
};

export const SearchBoxButton = ({
  type = "submit",
  className,
  ...delegated
}: Omit<ComponentProps<"button">, "children">) => {
  return (
    <Button
      type={type}
      variant="ghost"
      size="icon"
      className={cn("ui-rounded-full ui-px-2.5", className)}
      {...delegated}
    >
      <MagnifyingGlass className="ui-size-5" />
    </Button>
  );
};
