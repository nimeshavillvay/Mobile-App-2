import { api } from "@/_lib/api";
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
  return useSuspenseQuery({
    queryKey: ["user", "favorite-skus", productIds, token],
    queryFn: async () => {
      const response = await api
        .post("rest/my-favourite/favourite-skus", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          json: {
            products: productIds,
          },
          cache: "no-cache",
        })
        .json<FavoriteSku[]>();

      return response.map((data) => ({
        productId: data.productid,
        isFavorite: !!data.isFavourite,
        favoriteListIds: data.favoriteIds,
      }));
    },
  });
};

export default useSuspenseFavoriteSKUs;
