import { ACCOUNT_TOKEN_COOKIE } from "@/(old-design)/_lib/constants";
import Separator from "@/old/_components/separator";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PurchasedItemsList from "./purchased-items-list";

export const metadata: Metadata = {
  title: "Purchased Items",
};

const PurchasedItemsPage = () => {
  const accountTokenCookie = cookies().get(ACCOUNT_TOKEN_COOKIE);

  if (!accountTokenCookie?.value) {
    return redirect("/");
  }

  return (
    <>
      <div className="px-4 pt-4 md:px-0 md:pt-0">
        <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
          My Purchased Items
        </h2>

        <Separator
          orientation="horizontal"
          className="mb-4 h-px flex-1 bg-brand-primary"
        />
      </div>

      <PurchasedItemsList token={accountTokenCookie?.value} />
    </>
  );
};

export default PurchasedItemsPage;
