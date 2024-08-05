import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Text = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        d="M2.5 3.5L21.5 3.50002V18.5H15.0155L11.9979 21L9.0155 18.5H2.5V3.5Z"
        stroke="black"
      />
      <path
        d="M6.875 11C6.875 11.3452 7.15482 11.625 7.5 11.625C7.84518 11.625 8.125 11.3452 8.125 11C8.125 10.6548 7.84518 10.375 7.5 10.375C7.15482 10.375 6.875 10.6548 6.875 11ZM11.375 11C11.375 11.3452 11.6548 11.625 12 11.625C12.3452 11.625 12.625 11.3452 12.625 11C12.625 10.6548 12.3452 10.375 12 10.375C11.6548 10.375 11.375 10.6548 11.375 11ZM15.875 11C15.875 11.3452 16.1548 11.625 16.5 11.625C16.8452 11.625 17.125 11.3452 17.125 11C17.125 10.6548 16.8452 10.375 16.5 10.375C16.1548 10.375 15.875 10.6548 15.875 11Z"
        fill="black"
        stroke="black"
        strokeWidth="0.25"
        strokeLinecap="square"
      />
    </svg>
  );
};
