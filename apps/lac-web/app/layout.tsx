import { cn } from "@/_lib/utils";
import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster } from "@repo/web-ui/components/ui/toast";
import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { type ReactNode } from "react";
import AddToCartDialog from "./_add-to-cart-dialog";
import Footer from "./_footer";
import Header from "./_header";
import "./global.css";
import Providers from "./providers";
import SessionChecker from "./session-checker";

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
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
};

const RootLayout = ({ children }: { readonly children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={cn(
        "h-full scroll-smooth",
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
          <AddToCartDialog />
          <SessionChecker />

          {!!process.env.NEXT_PUBLIC_WURTH_LAC_GTM_KEY && (
            <GoogleTagManager
              gtmId={process.env.NEXT_PUBLIC_WURTH_LAC_GTM_KEY}
            />
          )}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
