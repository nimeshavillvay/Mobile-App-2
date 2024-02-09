import Breadcrumbs from "@/_components/breadcrumbs";
import { type ReactNode } from "react";

type CompanyInformationLayoutProps = {
  children: ReactNode;
};

const CompanyInformationLayout = ({
  children,
}: CompanyInformationLayoutProps) => {
  return (
    <>
      <Breadcrumbs links={[]} />

      <div className="py-8">{children}</div>
    </>
  );
};

export default CompanyInformationLayout;
