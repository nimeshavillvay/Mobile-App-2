import { getFetchHeaders, getFetchUrl } from "@/_lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";

type FavoriteSku = {
  productid: number;
  isFavourite: boolean;
  favoriteIds: string[];
};

const useSuspenseFavoriteSKUs = (
  token: string | undefined,
  productIds: string[],
) => {
  const productIdsAsString = productIds.join("-");

  return useSuspenseQuery<
    { productId: number; isFavorite: boolean; favoriteListIds: string[] }[],
    Error
  >({
    queryKey: [
      "user",
      "favorite-skus",
      `sku-${productIdsAsString}`,
      productIds,
      token,
    ],
    queryFn: async () => {
      const response = await fetch(
        getFetchUrl("/rest/my-favourite/favourite-skus"),
        {
          method: "POST",
          headers: getFetchHeaders(token),
          body: JSON.stringify({
            products: productIds,
          }),
          cache: "no-cache",
        },
      );

      if (!response.ok) {
        throw new Error("Favourite SKUs Error");
      }

      const json = (await response.json()) as FavoriteSku[];

      return json.map((data) => ({
        productId: data.productid,
        isFavorite: !!data.isFavourite,
        favoriteListIds: data.favoriteIds,
      }));
    },
  });
};

export default useSuspenseFavoriteSKUs;
