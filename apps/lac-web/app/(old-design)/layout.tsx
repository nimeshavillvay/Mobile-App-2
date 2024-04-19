import { type ReactNode } from "react";
import Header from "./_header";

// TODO Remove when the old APIs have been removed
export const dynamic = "force-dynamic";

const OldDesignRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      <div className="old-design-text-base">{children}</div>
    </>
  );
};

export default OldDesignRootLayout;
