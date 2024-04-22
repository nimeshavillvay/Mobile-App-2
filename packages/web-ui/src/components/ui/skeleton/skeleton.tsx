import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

export type SkeletonProps = ComponentProps<"div">;

const Skeleton = ({ className = "", ...delegated }: SkeletonProps) => {
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
