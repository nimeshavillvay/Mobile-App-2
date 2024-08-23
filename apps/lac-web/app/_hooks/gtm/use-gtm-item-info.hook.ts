import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE, SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useQuery } from "@tanstack/react-query";

type GTMProduct = {
  productid: string;
  cartid: number;
  item_id: string;
  item_sku: string;
  item_name: string;
  price: string;
  item_brand: string;
  item_variant: string;
  item_categoryid: string;
  coupon: string;
  coupon_discount: string;
  item_primarycategory: string;
  item_category_path: string[];
}[];

type Product = {
  productid: number;
  cartid: number | null | undefined;
}[];

const useGtmProducts = (productIdList: Product) => {
  const [cookies] = useCookies();
  const token = cookies[SESSION_TOKEN_COOKIE];

  return useQuery({
    queryKey: ["gtm", "products", productIdList, token],
    queryFn: async () => {
      const response = await api
        .post("rest/gtm/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // cache: "no-store",
          json: {
            products: productIdList,
          },
          next: {
            revalidate: DEFAULT_REVALIDATE,
          },
        })
        .json<GTMProduct>();
      return response;
    },
    // enabled: productIdList.length > 0,
  });
};

export default useGtmProducts;
