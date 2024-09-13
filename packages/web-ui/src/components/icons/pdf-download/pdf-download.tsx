import type { ComponentProps } from "react";
import React from "react";
import { cn } from "~/lib/utils";

export const PDFDownload = ({
  className,
  ...delegated
}: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={cn("stroke-black", className)}
      {...delegated}
    >
      <path
        d="M8.5 21.5H4.5V2.5H13L19.5 9V21.5H15.5M12 13.5V19.5M14.5 17.75L12 20.25L9.5 17.75M13 3V9H19"
        strokeLinecap="square"
      />
    </svg>
  );
};
