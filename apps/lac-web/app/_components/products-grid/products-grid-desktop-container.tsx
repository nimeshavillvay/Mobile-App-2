import { type ReactNode } from "react";

export const ProductsGridDesktopContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="hidden flex-row items-start gap-10 md:flex">{children}</div>
  );
};
