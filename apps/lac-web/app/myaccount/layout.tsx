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

      <h1>My Account</h1>

      <div className="flex flex-row">
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
