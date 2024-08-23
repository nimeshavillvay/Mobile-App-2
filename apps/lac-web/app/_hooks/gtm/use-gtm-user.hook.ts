import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { useQuery } from "@tanstack/react-query";

type GTMUser = {
  userid: string;
  account_type: string;
  account_industr: string;
  account_sales_category: string;
};

const useGtmUser = (productIdList: number[], token: string) => {
  return useQuery({
    queryKey: ["gtm", "user", productIdList, token],
    queryFn: async () => {
      const response = await api
        .get("rest/gtm/user", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          next: {
            revalidate: DEFAULT_REVALIDATE, // todo
          },
        })
        .json<GTMUser>();
      return response;
    },
    enabled: productIdList.length > 0,
  });
};

export default useGtmUser;
