import { forwardRef, type ComponentProps } from "react";
import { MagnifyingGlass } from "~/components/icons/magnifying-glass";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { BarcodeScan } from "../icons/barcode-scan";

export const SearchBox = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center rounded-full border border-wurth-gray-250",
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
        "min-w-0 flex-1 shrink rounded-l-full border-0 py-2.5 pl-3.5 text-sm placeholder:text-wurth-gray-400",
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
      className={cn("mx-0.5 rounded-full px-2", className)}
      {...delegated}
    >
      <MagnifyingGlass className="size-5" />
    </Button>
  );
};

export const BarcodeScanButton = forwardRef<
  HTMLButtonElement,
  Omit<ComponentProps<"button">, "children">
>(({ type = "submit", className, ...delegated }, ref) => {
  return (
    <Button
      ref={ref}
      type={type}
      variant="ghost"
      size="icon"
      className={cn("mx-0.5 rounded-full px-2", className)}
      {...delegated}
    >
      <BarcodeScan className="size-5" />

      <span className="sr-only">Scan barcode</span>
    </Button>
  );
});
BarcodeScanButton.displayName = "BarcodeScanButton";
