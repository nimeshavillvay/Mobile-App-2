import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const VerticalLine = ({
  className,
  ...delegated
}: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#4d4d4d"
      viewBox="0 0 16 16"
      className={cn("text-wurth-gray-800", className)}
      {...delegated}
    >
      <path d="M8 0h1v16h-1v-16z"></path>
    </svg>
  );
};
