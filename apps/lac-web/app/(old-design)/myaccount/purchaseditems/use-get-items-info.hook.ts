import { api } from "@/old/_lib/api";
import { useQuery } from "@tanstack/react-query";
import type { OrderHistoryItems } from "./types";

const useGetItemInfo = (token: string, skuList: string) => {
  return useQuery({
    queryKey: ["item-info", token, skuList],
    queryFn: () =>
      api
        .get("pim/webservice/rest/oderhistoryitems", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          searchParams: {
            sku: skuList,
            country: "US",
            county: "ORANGE",
            region: "CA",
          },
        })
        .json<OrderHistoryItems>(),
    enabled: !!skuList,
  });
};

export default useGetItemInfo;
