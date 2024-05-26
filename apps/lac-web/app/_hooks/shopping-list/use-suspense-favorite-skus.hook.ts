import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

type FavoriteSku = {
  productid: number;
  isFavourite: boolean;
  favoriteIds: string[];
};

const useSuspenseFavoriteSKUs = (token: string, productIds: string[]) => {
  const productIdsAsString = productIds.join("-");

  return useSuspenseQuery({
    queryKey: [
      "user",
      `favorite-skus-${productIdsAsString}`,
      productIds,
      token,
    ],
    queryFn: async () => {
      return api
        .post("rest/my-favourite/favourite-skus", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          json: {
            products: productIds,
          },
        })
        .json<FavoriteSku[]>();
    },
    select: (
      data,
    ): {
      productId: number;
      isFavorite: boolean;
      favoriteListIds: string[];
    }[] => {
      return data.map((data: FavoriteSku) => ({
        productId: data.productid,
        isFavorite: !!data.isFavourite,
        favoriteListIds: data.favoriteIds,
      }));
    },
  });
};

export default useSuspenseFavoriteSKUs;
