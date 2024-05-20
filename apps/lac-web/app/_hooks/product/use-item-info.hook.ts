import { getItemInfo } from "@/_lib/apis/shared";
import { useQuery } from "@tanstack/react-query";

const useItemInfo = (productIdList: number[], token?: string) => {
  return useQuery({
    queryKey: ["item-info", productIdList, token],
    queryFn: async () => {
      return await getItemInfo(productIdList, token);
    },
    enabled: productIdList.length > 0,
  });
};

export default useItemInfo;
