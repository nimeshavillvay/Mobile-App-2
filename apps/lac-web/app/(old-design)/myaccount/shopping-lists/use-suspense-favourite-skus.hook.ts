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
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Add a 5-second timeout
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
      favouriteIds: string[];
    }[] => {
      return data.map((data: FavouriteSku) => ({
        productId: data.productid,
        isFavourite: !!data.isFavourite,
        favouriteIds: data.favoriteIds,
      }));
    },
  });
};

export default useSuspenseFavouriteSKUs;
