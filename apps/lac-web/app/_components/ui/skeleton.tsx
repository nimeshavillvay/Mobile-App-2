import { cn } from "@/_utils/helpers";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-brand-gray animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
