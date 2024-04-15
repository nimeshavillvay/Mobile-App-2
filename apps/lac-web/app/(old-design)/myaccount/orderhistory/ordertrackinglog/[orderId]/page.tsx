import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrderTrackingLog } from "./api";

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
  const trackingLog = await getOrderTrackingLog(orderId);

  return (
    <div>
      <h1>OrderTrackingLogPage {trackingLog.orderNo}</h1>
    </div>
  );
};
export default OrderTrackingLogPage;
