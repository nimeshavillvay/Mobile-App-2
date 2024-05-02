import dayjs from "dayjs";
import Link from "next/link";
import { getPlantName, getShippingMethodName } from "../../client-helpers";
import { UI_DATE_FORMAT } from "./constants";
import OrderTrackingCardForMobile from "./order-tracking-card-for-mobile";
import type { TrackingInfo } from "./types";

type OrderTrackingCardProps = {
  trackingInfo: TrackingInfo;
};

const OrderTrackingCard = ({ trackingInfo }: OrderTrackingCardProps) => {
  return (
    <>
      <div className="hidden p-[30px] shadow-[0_1px_6px_rgba(0,0,0,.148324)] md:block">
        <div className="mb-5 font-bold text-brand-primary">
          Shipped from&nbsp;
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
                  Ship Date:&nbsp;
                  {delivery?.shipDate
                    ? dayjs(delivery?.shipDate).format(UI_DATE_FORMAT)
                    : "N/A"}
                </div>
                <div className="font-bold">
                  Delivery#: {delivery?.deliveryNo ?? "N/A"}
                </div>
                <div className="font-bold">
                  Shipper:&nbsp;
                  {delivery?.shippingMethod
                    ? getShippingMethodName(delivery.shippingMethod)
                    : "N/A"}
                </div>
              </div>
              {delivery &&
                delivery.tracker?.length &&
                delivery.tracker.map((tracker) => (
                  <div
                    key={`${delivery.deliveryNo}-${tracker.code}`}
                    className="font-bold text-black"
                  >
                    <Link href={tracker.url ?? "#"} target="_blank">
                      Tracking#: {tracker.code ?? "N/A"}
                    </Link>
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
