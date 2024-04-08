import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

const ChevronLeft = ({ className, ...delegated }: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={cn("ui-stroke-black", className)}
      {...delegated}
    >
      <path strokeLinecap="square" d="M15 20l-8-8 8-8"></path>
    </svg>
  );
};

export default ChevronLeft;