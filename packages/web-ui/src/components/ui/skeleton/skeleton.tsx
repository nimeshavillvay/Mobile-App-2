import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

const Skeleton = ({ className = "", ...delegated }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "ui-animate-pulse ui-rounded-md ui-bg-zinc-900/10",
        className,
      )}
      {...delegated}
    />
  );
};

export { Skeleton };
