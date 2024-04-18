import { type ReactNode } from "react";
import Header from "./_header";

const OldDesignRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      <div className="old-design-text-base">{children}</div>
    </>
  );
};

export default OldDesignRootLayout;
