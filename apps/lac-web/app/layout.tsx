import { cn } from "@/_lib/utils";
import AccountSelectorDialog from "@/old/account-selector-dialog";
import LoginDialog from "@/old/login-dialog";
import { Toaster } from "@repo/web-ui/components/ui/toast";
import { type Metadata } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { type ReactNode } from "react";
import Footer from "./_footer";
import Header from "./_header";
import "./global.css";
import Providers from "./providers";

// TODO Remove this and delete all the local font files after the old designs are removed
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

const titleFont = localFont({
  src: [
    {
      path: "./_fonts/Jost.ttf",
    },
  ],
  variable: "--font-title",
  display: "swap",
});
const bodyFont = localFont({
  src: [
    {
      path: "./_fonts/DMSans.ttf",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wurth Louis and Company",
    template: "%s | Wurth Louis and Company",
  },
  metadataBase: new URL(process.env.VERCEL_URL ?? "http://localhost:3000"),
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
      <body className="flex h-full flex-col justify-between font-body antialiased">
        <Providers>
          <NextTopLoader showSpinner={false} color="#cc0000" />

          <Header />

          <main className="flex-1">{children}</main>

          <Footer />

          <Toaster />

          <LoginDialog />
          <AccountSelectorDialog />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
