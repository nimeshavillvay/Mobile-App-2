import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import { getGTMPageType } from "@/_lib/gtm-utils";
import { sendGTMEvent } from "@next/third-parties/google";
import type { Metadata } from "next";
import DesktopOrderActions from "./desktop-order-actions";
import DesktopView from "./desktop-view";
import MobileView from "./mobile-view";

export const metadata: Metadata = {
  title: "Order Confirmation",
};

type ConfirmationPageProps = {
  readonly params: {
    orderNo: string;
  };
};

const ConfirmationPage = async ({
  params: { orderNo },
}: ConfirmationPageProps) => {
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

  return (
    <>
      <h1 className="container mb-6 mt-4 font-title text-2xl font-medium tracking-[-0.144px] text-wurth-gray-800 md:mb-2 md:mt-6 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.576px] print:hidden">
        Thank you for your order
      </h1>

      <div className="container mb-4 hidden md:flex md:flex-row md:items-center md:justify-between print:hidden">
        <h2 className="text-base text-wurth-gray-800">Order #{orderNo}</h2>

        <DesktopOrderActions />
      </div>

      <MobileView orderNo={orderNo} />
      <DesktopView orderNo={orderNo} />
    </>
  );
};

export default ConfirmationPage;
