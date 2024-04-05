import { api } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";
import type { OrderHistoryItems } from "./types";

const useGetItemInfo = (token: string, skuList: string[]) => {
  return useQuery({
    queryKey: ["item-info", token, skuList],
    queryFn: () =>
      api
        .get("rest/oderhistoryitems", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          searchParams: { sku: skuList.toString() },
        })
        .json<OrderHistoryItems>(),
    enabled: skuList.length > 0,
  });
};

export default useGetItemInfo;
