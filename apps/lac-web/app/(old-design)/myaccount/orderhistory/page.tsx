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
      <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
        My Orders
      </h2>

      <Separator
        orientation="horizontal"
        className="mb-4 h-px flex-1 bg-brand-primary"
      />

      <OrderHistoryList token={accountTokenCookie?.value} />
    </>
  );
};

export default OrderHistoryPage;
