import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

type FavouriteSku = {
  productid: number;
  isFavourite: boolean;
  favoriteIds: string[];
};

const useSuspenseFavouriteSKUs = (token: string, productIds: string[]) => {
  const productIdsAsString = productIds.join("-");

  return useSuspenseQuery({
    queryKey: [
      "user",
      `favourite-skus-${productIdsAsString}`,
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
        .json<FavouriteSku[]>();
    },
    select: (
      data,
    ): {
      productId: number;
      isFavourite: boolean;
      favouriteListIds: string[];
    }[] => {
      return data.map((data: FavouriteSku) => ({
        productId: data.productid,
        isFavourite: !!data.isFavourite,
        favouriteListIds: data.favoriteIds,
      }));
    },
  });
};

export default useSuspenseFavouriteSKUs;
