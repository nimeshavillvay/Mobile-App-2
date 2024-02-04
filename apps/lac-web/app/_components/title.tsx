import { cn } from "@/_utils/helpers";
import { type ComponentProps } from "react";

const Title = ({ className, ...delegated }: ComponentProps<"h2">) => {
  return (
    <h2
      className={cn(
        "text-brand-very-dark-gray text-[28px] font-medium leading-8",
        className,
      )}
      {...delegated}
    />
  );
};

export default Title;
