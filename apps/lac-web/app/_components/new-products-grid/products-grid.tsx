import { type ReactNode } from "react";

export const ProductsGrid = ({ children }: { children?: ReactNode }) => {
  return (
    <section className="my-14 space-y-3 md:my-20 md:space-y-6">
      {children}
    </section>
  );
};
