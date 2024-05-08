import { cn } from "@/_lib/utils";
import localFont from "next/font/local";
import { type ReactNode } from "react";

const wurth = localFont({
  src: [
    {
      path: "./wuerth-bold.woff2",
      weight: "700",
    },
    {
      path: "./wuerth-extrabold-cond.woff2",
      weight: "800",
    },
  ],
  variable: "--wurth-font",
  display: "swap",
});

const OldDesignRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cn("old-design-text-base", wurth.variable)}>{children}</div>
  );
};

export default OldDesignRootLayout;
