import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { getGTMPageType } from "@/_lib/gtm-utils";
import Separator from "@/old/_components/separator";
import { sendGTMEvent } from "@next/third-parties/google";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrderHistoryList from "./order-history-list";

export const metadata: Metadata = {
  title: "My Orders",
};

const OrderHistoryPage = () => {
  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  sendGTMEvent({
    event: "view_page",
    viewPageData: {
      page_type: getGTMPageType(
        pathnameHistory[pathnameHistory.length - 1] ?? "",
      ),
    },
  });

  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!tokenCookie) {
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

      <OrderHistoryList token={tokenCookie.value} />
    </>
  );
};

export default OrderHistoryPage;
