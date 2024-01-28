import Breadcrumbs from "@/_components/breadcrumbs";
import { type ReactNode } from "react";
import SideMenu from "./_side-menu";
import Profile from "./profile";

type MyAccountLayoutProps = {
  children: ReactNode;
};

const MyAccountLayout = ({ children }: MyAccountLayoutProps) => {
  return (
    <>
      <Breadcrumbs links={[{ href: "/myaccount", label: "My Account" }]} />

      <h1 className="max-w-desktop mx-auto">My Account</h1>

      <div className="max-w-desktop mx-auto flex flex-row">
        <aside className="w-[280px]">
          <Profile />

          <SideMenu />
        </aside>

        <div>{children}</div>
      </div>
    </>
  );
};

export default MyAccountLayout;
