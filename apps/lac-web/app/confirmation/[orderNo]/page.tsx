import type { Metadata } from "next";
import DesktopView from "./desktop-view";
import MobileView from "./mobile-view";

export const metadata: Metadata = {
  title: "Order Confirmation",
};

type ConfirmationPageProps = {
  params: {
    orderNo: string;
  };
};

const ConfirmationPage = async ({
  params: { orderNo },
}: ConfirmationPageProps) => {
  return (
    <>
      <h1 className="container mb-6 mt-4 font-title text-2xl font-medium tracking-[-0.144px] text-wurth-gray-800 md:mb-2 md:mt-6 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.576px]">
        Thank you for your order
      </h1>

      <h2 className="container mb-4 hidden text-base text-wurth-gray-800 md:block">
        Order #{orderNo}
      </h2>

      <MobileView orderNo={orderNo} />
      <DesktopView orderNo={orderNo} />
    </>
  );
};

export default ConfirmationPage;
