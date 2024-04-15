import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import "server-only";

export const getOrderTrackingLog = async (orderId: string) => {
  return await api
    .get("rest/order-history/tracker", {
      searchParams: {
        orderNo: orderId,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{
      orderNo: string;
      shipToAddress: {
        attention: string;
        shipToStreet: string;
        shipToCity: Date;
        shipToZip: string;
        shipToCountry: string;
        shipToRegion: string;
        shipToPhone: string;
      };
      tracking_info: unknown[];
      driverNotes: string;
    }>();
};
