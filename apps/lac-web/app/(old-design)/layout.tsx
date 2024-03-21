import { type ReactNode } from "react";
import { Toaster } from "./_components/ui/toaster";
import Header from "./_header";

const OldDesignRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      <div className="old-design-text-base">{children}</div>

      <Toaster />
    </>
  );
};

export default OldDesignRootLayout;
