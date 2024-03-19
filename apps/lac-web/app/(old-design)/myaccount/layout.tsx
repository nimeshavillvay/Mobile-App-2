import Breadcrumbs from "@/old/_components/breadcrumbs";
import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
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

      <div className="container mb-4 mt-8 flex flex-row items-center gap-2.5">
        <Title className="text-brand-primary">My Account</Title>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-primary"
        />
      </div>

      <div className="xs:flex-row container flex flex-col">
        <aside className="xs xs:mb-0 xs:w-[280px] mb-6">
          <Profile />

          <SideMenu />
        </aside>

        <div className="xs:pl-12 relative w-full px-0">{children}</div>
      </div>
    </>
  );
};

export default MyAccountLayout;
