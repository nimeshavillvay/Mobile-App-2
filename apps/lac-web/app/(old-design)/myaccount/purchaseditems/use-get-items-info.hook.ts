import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { OldItemInfo } from "@/_lib/types";
import { mapGetItemInfoResponse } from "@/_mappers/get-item-info.mapper";
import { useQuery } from "@tanstack/react-query";

const useGetItemInfo = (productIdList: number[]) => {
  const [cookies] = useCookies();

  return useQuery({
    queryKey: ["item-info", cookies[SESSION_TOKEN_COOKIE], productIdList],
    queryFn: () =>
      api
        .get("rest/getiteminfo", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          searchParams: { productids: productIdList.toString() },
        })
        .json<OldItemInfo[]>(),
    enabled: productIdList.length > 0,
    select: (data) => mapGetItemInfoResponse(data),
  });
};

export default useGetItemInfo;
