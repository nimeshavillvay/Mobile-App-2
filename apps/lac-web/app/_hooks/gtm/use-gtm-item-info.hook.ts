import useCookies from "@/_hooks/storage/use-cookies.hook";
import type { Product } from "@/_lib/apis/gtm-item-info";
import { getGtmProducts } from "@/_lib/apis/gtm-item-info";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useQuery } from "@tanstack/react-query";

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
