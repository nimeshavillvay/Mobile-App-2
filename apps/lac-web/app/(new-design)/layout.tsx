import { type ReactNode } from "react";
import Header from "./_header";

// TODO Move these components and elements to the root layout file after the old designs have been completely removed
const NewDesignLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      <main className="flex-1">{children}</main>

      <footer>Footer</footer>
    </>
  );
};

export default NewDesignLayout;
