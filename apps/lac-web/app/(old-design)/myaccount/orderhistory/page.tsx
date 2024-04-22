import Separator from "@/old/_components/separator";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrderHistoryList from "./order-history-list";

export const metadata: Metadata = {
  title: "My Orders",
};

const OrderHistoryPage = () => {
  const accountTokenCookie = cookies().get(ACCOUNT_TOKEN_COOKIE);

  if (!accountTokenCookie?.value) {
    return redirect("/");
  }

  return (
    <>
      <div className="container py-4 md:px-0 md:py-0">
        <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
          My Orders
        </h2>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-primary"
        />
      </div>

      <OrderHistoryList token={accountTokenCookie?.value} />
    </>
  );
};

export default OrderHistoryPage;
