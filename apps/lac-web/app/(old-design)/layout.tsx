import { type ReactNode } from "react";
import { Toaster } from "./_components/ui/toaster";
import Footer from "./_footer";
import Header from "./_header";
import AccountSelectorDialog from "./account-selector-dialog";
import LoginDialog from "./login-dialog";

const OldDesignRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      <main className="full-bleed-wrapper old-design-text-base flex-1">
        {children}
      </main>

      <Footer />

      <Toaster />

      <LoginDialog />
      <AccountSelectorDialog />
    </>
  );
};

export default OldDesignRootLayout;
