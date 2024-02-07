import { cn } from "@/_utils/helpers";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-brand-gray-300 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
