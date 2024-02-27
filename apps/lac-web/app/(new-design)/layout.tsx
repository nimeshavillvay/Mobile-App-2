import { type ReactNode } from "react";
import Header from "./_header";

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
