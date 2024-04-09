import { api } from "@/_lib/api";
import { mapGetItemInfoResponse } from "@/_mappers/get-item-info-mapper";
import { useQuery } from "@tanstack/react-query";
import type { OrderHistoryItems } from "./types";

const useGetItemInfo = (token: string, productIdList: string[]) => {
  return useQuery({
    queryKey: ["item-info", token, productIdList],
    queryFn: () =>
      api
        .get("rest/getiteminfo", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          searchParams: { productids: productIdList.toString() },
        })
        .json<OrderHistoryItems>(),
    enabled: productIdList.length > 0,
    select: (data) => mapGetItemInfoResponse(data),
  });
};

export default useGetItemInfo;
