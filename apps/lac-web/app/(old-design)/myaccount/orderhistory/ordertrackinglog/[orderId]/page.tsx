import { getPlants, getShippingMethods } from "@/_lib/apis/server";
import Separator from "@/old/_components/separator";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "../../back-button";
import { getOrderTrackingLog } from "./api";
import OrderTrackingCard from "./order-tracking-card";
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
    title: `Order Tracking - ${orderId}`,
    description: `Order tracking log related to order - ${orderId}`,
  };
};

const OrderTrackingLogPage = async ({
  params: { orderId },
}: OrderTrackingLogPageProps) => {
  if (!orderId) {
    return notFound();
  }

  const trackingLog = await getOrderTrackingLog(orderId);

  const [shippingMethods, plants] = await Promise.all([
    getShippingMethods(),
    getPlants(),
  ]);

  const trackingInfo = trackingLog.trackingInfo;

  return (
    <div className="container md:px-0">
      <BackButton
        title={`Back to Order #${trackingLog.orderNo}`}
        className="my-4"
      />

      <Separator
        orientation="horizontal"
        className="h-px flex-1 bg-brand-primary"
      />

      <div className="space-y-4">
        <div className="grid grid-cols-1 pt-4 text-brand-gray-500 md:grid-cols-3 md:py-4">
          <div className="hidden py-2 font-wurth text-[19px] font-bold md:block">
            Order# {trackingLog.orderNo}
          </div>

          <div className="flex flex-col rounded-t border border-b-0 p-3 md:border-0 md:p-0">
            <div className="mb-1 text-sm md:mb-0 md:py-2 md:font-wurth md:text-[19px] md:font-bold">
              Shipping Address
            </div>

            <SelectedShippingName />

            <div className="text-wrap">
              {trackingLog.shipToAddress.street ?? "N/A"}
            </div>

            {trackingLog.shipToAddress.attention !== "" && (
              <div>{trackingLog.shipToAddress.attention}</div>
            )}

            <div>
              {trackingLog.shipToAddress.city ?? "N/A"},&nbsp;
              {trackingLog.shipToAddress.region ?? "N/A"}&nbsp;
              {trackingLog.shipToAddress.zipCode ?? "N/A"}
            </div>

            <div>Phone: {trackingLog.shipToAddress.phoneNumber}</div>
          </div>

          <div className="flex flex-col rounded-b border p-3 md:border-0 md:p-0">
            <div className="text-sm md:py-2 md:font-wurth md:text-[19px] md:font-bold">
              Driver&rsquo;s Notes
            </div>

            <p>
              {trackingLog.driverNotes !== "" ? trackingLog.driverNotes : "N/A"}
            </p>
          </div>
        </div>

        {trackingInfo?.length &&
          trackingInfo.map((info, index) => (
            <OrderTrackingCard
              key={`${info?.plant}-${index}`}
              trackingInfo={info}
              shippingMethods={shippingMethods}
              plants={plants}
            />
          ))}
      </div>
    </div>
  );
};

export default OrderTrackingLogPage;
