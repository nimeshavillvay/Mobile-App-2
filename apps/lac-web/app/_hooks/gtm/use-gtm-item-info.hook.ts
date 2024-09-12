import useCookies from "@/_hooks/storage/use-cookies.hook";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "./use-gtm-item-info";
import { getGtmProducts } from "./use-gtm-item-info";

const useGtmProducts = (productIdList: Product) => {
  const [cookies] = useCookies();
  const token = cookies[SESSION_TOKEN_COOKIE];

  return useQuery({
    queryKey: ["gtm", "products", productIdList, token],
    queryFn: async () => getGtmProducts(productIdList, token),
    enabled: productIdList.length > 0,
  });
};
export default useGtmProducts;
