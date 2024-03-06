import { cn } from "@/_lib/utils";
import { type Metadata } from "next";
import { DM_Sans, Jost } from "next/font/google";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { type ReactNode } from "react";
import "./global.css";
import Providers from "./providers";

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

const titleFont = Jost({
  subsets: ["latin"],
  variable: "--font-title",
});
const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Wurth Louis and Company",
    template: "%s | Wurth Louis and Company",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={cn(
        "h-full scroll-smooth",
        wurth.variable,
        titleFont.variable,
        bodyFont.variable,
      )}
    >
      <body className="font-content flex h-full flex-col justify-between antialiased">
        <Providers>
          <NextTopLoader showSpinner={false} color="#cc0000" />

          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
