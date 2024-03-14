import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

const Menu = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
      <path
        stroke="#000"
        strokeLinecap="square"
        d="M2.5 12h19m-19-6.5h19m-19 13h19"
      ></path>
    </svg>
  );
};

export default Menu;