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

      <div className="mb-4 mt-8 flex flex-row items-center gap-2.5">
        <Title className="text-brand-primary">My Account</Title>

        <Separator
          orientation="horizontal"
          className="bg-brand-primary h-px flex-1"
        />
      </div>

      <div className="flex flex-row">
        <aside className="w-[280px]">
          <Profile />

          <SideMenu />
        </aside>

        <div className="relative w-full pl-12">{children}</div>
      </div>
    </>
  );
};

export default MyAccountLayout;
