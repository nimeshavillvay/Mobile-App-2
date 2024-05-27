import { cn } from "@/old/_utils/helpers";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-brand-gray-300", className)}
      {...props}
    />
  );
};

export { Skeleton };
