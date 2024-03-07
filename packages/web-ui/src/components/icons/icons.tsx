import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

export const AddToCart = ({
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
      className={cn("ui-stroke-black", className)}
      {...delegated}
    >
      <path
        strokeLinecap="square"
        d="M21.25 5.75l-1.75 9.5H6L3.5 2.75H1.75M9.5 7h3.25m0 0H16m-3.25 0V3.75m0 3.25v3.25M9.25 19a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm9 0a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
      />
    </svg>
  );
};

export const HeartOutline = ({
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
      className={cn("ui-stroke-black", className)}
      {...delegated}
    >
      <path d="M12 5.376c6.504-6.63 17.654 5.681 0 15.624-17.654-9.942-6.504-22.253 0-15.624z" />
    </svg>
  );
};

export const HeartFilled = ({
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
      className={cn("ui-fill-black", className)}
      {...delegated}
    >
      <path d="M12.245 21.436c8.911-5.019 10.813-10.804 9.279-14.648-.756-1.893-2.337-3.239-4.188-3.654-1.738-.39-3.673.05-5.336 1.55-1.663-1.5-3.598-1.94-5.336-1.55-1.851.415-3.432 1.76-4.188 3.654-1.534 3.844.368 9.63 9.279 14.648l.245.138.245-.138z" />
    </svg>
  );
};
