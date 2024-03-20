import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "ui-animate-pulse ui-rounded-md ui-bg-zinc-900/10",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
