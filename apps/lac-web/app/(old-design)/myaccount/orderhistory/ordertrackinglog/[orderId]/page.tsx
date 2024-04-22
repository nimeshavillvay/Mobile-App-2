import Separator from "@/old/_components/separator";
import dayjs from "dayjs";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderTrackingLog } from "./api";
import BackButton from "./back-button";
import { PLANTS, SHIPPING_METHODS, UI_DATE_FORMAT } from "./constants";
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
  const trackingLog = await getOrderTrackingLog(orderId);
  const trackingInfo = trackingLog.trackingInfo;

  const getPlantName = (plant: string) => {
    // use keyof to ensure that the plant is a valid key
    return PLANTS[plant as keyof typeof PLANTS];
  };

  const getShippingMethod = (method: string) => {
    // use keyof to ensure that the method is a valid key
    return SHIPPING_METHODS[method as keyof typeof SHIPPING_METHODS];
  };

  return (
    <>
      <BackButton orderId={trackingLog.orderNo.toString()} />

      <Separator
        orientation="horizontal"
        className="h-px flex-1 bg-brand-primary"
      />

      <div className="space-y-4">
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
            <div className="font-wurth text-[19px] font-bold md:py-2">
              Driver&rsquo;s Notes
            </div>

            <p>
              {trackingLog.driverNotes !== "" ? trackingLog.driverNotes : "N/A"}
            </p>
          </div>
        </div>

        {/* Order Tracking Info Cards */}
        {trackingInfo?.length &&
          trackingInfo.map((info) => (
            <div
              key={info.plant}
              className="p-[30px] shadow-[0_1px_6px_rgba(0,0,0,.148324)]"
            >
              <div className="mb-5 font-bold text-brand-primary">
                Shipped from {info?.plant ? getPlantName(info.plant) : "N/A"}
              </div>
              {info?.deliveries?.length &&
                info.deliveries.map((delivery) => (
                  <>
                    <div
                      key={`${delivery?.deliveryNo}-${delivery?.shipDate}`}
                      className="mb-4 grid grid-cols-1 text-brand-gray-500 md:grid-cols-3"
                    >
                      <div className="font-bold">
                        Ship Date:{" "}
                        {delivery?.shipDate
                          ? dayjs(delivery?.shipDate).format(UI_DATE_FORMAT)
                          : "N/A"}
                      </div>
                      <div className="font-bold">
                        Delivery#: {delivery?.deliveryNo ?? "N/A"}
                      </div>
                      <div className="font-bold">
                        Shipper:{" "}
                        {delivery?.shippingMethod
                          ? getShippingMethod(delivery.shippingMethod)
                          : "N/A"}
                      </div>
                    </div>
                    {delivery &&
                      delivery.tracker?.length &&
                      delivery.tracker.map((trackingNumber) => (
                        <div
                          key={`${delivery.deliveryNo}-${trackingNumber}`}
                          className="font-bold text-black"
                        >
                          {/* TODO: Tracking url to be build */}
                          <Link href="#">
                            Tracking#: {trackingNumber ?? "N/A"}
                          </Link>
                        </div>
                      ))}
                  </>
                ))}
            </div>
          ))}
      </div>
    </>
  );
};
export default OrderTrackingLogPage;
