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

      <div className="md:container">
        <div className="mb-4 mt-8  hidden items-center gap-2.5 md:flex md:flex-row">
          <Title className="text-brand-primary">My Account</Title>

          <Separator
            orientation="horizontal"
            className="h-px flex-1 bg-brand-primary"
          />
        </div>

        <div className="flex flex-col md:flex-row">
          <aside className="mb-6 hidden md:mb-0 md:block md:w-[280px]">
            <Profile />

            <SideMenu />
          </aside>

          <div className="relative w-full px-0 md:pl-12">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MyAccountLayout;
