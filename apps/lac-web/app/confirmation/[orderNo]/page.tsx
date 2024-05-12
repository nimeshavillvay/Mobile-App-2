import type { Metadata } from "next";
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
      <h1 className="container mb-6 mt-4 font-title text-2xl font-medium tracking-[-0.144px] text-wurth-gray-800">
        Thank you for your order
      </h1>

      <MobileView orderNo={orderNo} />
    </>
  );
};

export default ConfirmationPage;
