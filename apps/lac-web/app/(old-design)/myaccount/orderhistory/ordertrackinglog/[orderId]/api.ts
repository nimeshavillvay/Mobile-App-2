import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import "server-only";

type OrderTracker = {
  orderNo: string;
  shipToAddress: {
    attention: string;
    shipToStreet: string;
    shipToCity: string;
    shipToZip: string;
    shipToCountry: string;
    shipToRegion: string;
    shipToPhone: string;
  };
  tracking_info: unknown[];
  driverNotes: string;
};

export const getOrderTrackingLog = async (orderId: string) => {
  const { orderNo, shipToAddress, tracking_info, driverNotes } = await api
    .get("rest/order-history/tracker", {
      searchParams: {
        orderNo: orderId,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<OrderTracker>();

  const transformedData = {
    orderNo: Number(orderNo),
    shipToAddress: {
      attention: shipToAddress.attention,
      street: shipToAddress.shipToStreet,
      city: shipToAddress.shipToCity,
      zipCode: shipToAddress.shipToZip,
      country: shipToAddress.shipToCountry,
      region: shipToAddress.shipToRegion,
      phoneNumber: shipToAddress.shipToPhone,
    },
    trackingInfo: tracking_info,
    driverNotes: driverNotes,
  };

  return transformedData;
};
