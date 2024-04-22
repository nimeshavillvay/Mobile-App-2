import dayjs from "dayjs";
import Link from "next/link";
import { PLANTS, SHIPPING_METHODS, UI_DATE_FORMAT } from "./constants";
import OrderTrackingCardForMobile from "./order-tracking-card-for-mobile";
import type { TrackingInfo } from "./types";

type OrderTrackingCardProps = {
  trackingInfo: TrackingInfo;
};

const OrderTrackingCard = ({ trackingInfo }: OrderTrackingCardProps) => {
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
      <div className="hidden p-[30px] shadow-[0_1px_6px_rgba(0,0,0,.148324)] md:block">
        <div className="mb-5 font-bold text-brand-primary">
          Shipped from{" "}
          {trackingInfo?.plant ? getPlantName(trackingInfo.plant) : "N/A"}
        </div>
        {trackingInfo?.deliveries?.length &&
          trackingInfo.deliveries.map((delivery) => (
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
                    <Link href="#">Tracking#: {trackingNumber ?? "N/A"}</Link>
                  </div>
                ))}
            </>
          ))}
      </div>

      <OrderTrackingCardForMobile trackingInfo={trackingInfo} />
    </>
  );
};

export default OrderTrackingCard;
