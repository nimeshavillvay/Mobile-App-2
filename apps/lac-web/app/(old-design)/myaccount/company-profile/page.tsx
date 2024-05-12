import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BillingAddress from "./billing-address";
import CompanyProfileImage from "./company-profile-image";
import ShippingAddress from "./shipping-address";

export const metadata: Metadata = {
  title: "Company Profile",
};

const CompanyProfilePage = () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionToken) {
    return redirect("/");
  }

  return (
    <>
      <div className="mb-4 flex flex-row items-center gap-2.5">
        <Title className="relative font-wurth text-xl font-medium text-brand-primary">
          Company Profile
        </Title>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-primary"
        />
      </div>

      <CompanyProfileImage token={sessionToken?.value} />

      <BillingAddress token={sessionToken?.value} />

      <ShippingAddress token={sessionToken?.value} />
    </>
  );
};

export default CompanyProfilePage;
