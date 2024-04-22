import { cn } from "@/_lib/utils";
import { type ComponentProps } from "react";

type InputHelperDescriptionProps = {
  isError?: boolean;
  children?: ComponentProps<"div">["children"];
};

const InputHelperDescription = ({
  isError,
  children,
}: InputHelperDescriptionProps) => {
  return (
    <p
      className={cn(
        "text-sm text-wurth-gray-500",
        isError && "text-wurth-red-650",
      )}
    >
      {children}
    </p>
  );
};

export default InputHelperDescription;
