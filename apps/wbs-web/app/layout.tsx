import { cn } from "@/_lib/utils/";
import type { Metadata } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import Footer from "./_components/organisms/footer";
import "./globals.css";
import Providers from "./providers";

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
    default: "Würth Baer Supply Company",
    template: "%s | Würth Baer Supply Company",
  },
  description: "Industrial Woodworking Wholesale Distributor",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
