import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const FileDownload = ({
  className,
  ...delegated
}: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={cn("stroke-black", className)}
      {...delegated}
    >
      <path
        d="M5.66667 14.3333H3V1.66663H8.66667L13 5.99996V14.3333H10.3333M8 8.99996V13M9.66667 11.8333L8 13.5L6.33333 11.8333M8.66667 1.99996V5.99996H12.6667"
        strokeLinecap="square"
      />
    </svg>
  );
};
