import Separator from "@/old/_components/separator";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrderTrackingLog } from "./api";
import BackButton from "./back-button";
import SelectedShippingName from "./selected-shipping-name";

type OrderTrackingLogPageProps = {
  params: {
    orderId: string;
  };
};

export const generateMetadata = async ({
  params: { orderId },
}: OrderTrackingLogPageProps): Promise<Metadata> => {
  // Check if the orderId exists
  if (!orderId) {
    return notFound();
  }

  return {
    title: orderId,
    description: orderId,
  };
};

const OrderTrackingLogPage = async ({
  params: { orderId },
}: OrderTrackingLogPageProps) => {
  // const address = useSelectedAddress();
  const trackingLog = await getOrderTrackingLog(orderId);

  return (
    <>
      <BackButton orderId={trackingLog.orderNo} />

      <Separator
        orientation="horizontal"
        className="h-px flex-1 bg-brand-primary"
      />

      <div className="grid grid-cols-1 py-4 text-brand-gray-500 md:grid-cols-3">
        <div className="hidden py-2 font-wurth text-[19px] font-bold md:block">
          Order# {trackingLog.orderNo}
        </div>

        <div className="flex flex-col rounded-t border border-b-0 p-3 md:border-0 md:p-0">
          <div className="font-wurth text-[19px] font-bold md:py-2">
            Shipping Address
          </div>

          <SelectedShippingName />

          <div className="text-wrap">
            {trackingLog.shipToAddress.shipToStreet}
          </div>

          {trackingLog.shipToAddress.attention !== "" && (
            <div>{trackingLog.shipToAddress.attention}</div>
          )}

          <div>
            {trackingLog.shipToAddress.shipToCity ?? "N/A"},&nbsp;
            {trackingLog.shipToAddress.shipToRegion ?? "N/A"}&nbsp;
            {trackingLog.shipToAddress.shipToZip ?? "N/A"}
          </div>

          <div>Phone: {trackingLog.shipToAddress.shipToPhone}</div>
        </div>

        <div className="flex flex-col rounded-b border p-3 md:border-0 md:p-0">
          <div className="font-wurth text-[19px] font-bold md:py-2">
            Driver&rsquo;s Notes
          </div>
          <p>
            {trackingLog.driverNotes !== "" ? trackingLog.driverNotes : "N/A"}
          </p>
        </div>
      </div>
    </>
  );
};
export default OrderTrackingLogPage;
