import { api } from "@/_lib/api";
import { OldItemInfo } from "@/_lib/types";
import { mapGetItemInfoResponse } from "@/_mappers/get-item-info.mapper";
import { useQuery } from "@tanstack/react-query";

const useGetItemInfo = (token: string, productIdList: number[]) => {
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
        .json<OldItemInfo[]>(),
    enabled: productIdList.length > 0,
    select: (data) => mapGetItemInfoResponse(data),
  });
};

export default useGetItemInfo;
