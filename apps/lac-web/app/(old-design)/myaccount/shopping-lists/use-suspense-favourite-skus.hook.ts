import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseFavouriteSKUs = (token: string, productIds: string[]) => {
  return useSuspenseQuery({
    queryKey: ["user", "favourite-skus", token, productIds],
    queryFn: () =>
      api
        .post("rest/my-favourite/favourite-skus", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          json: {
            products: productIds,
          },
        })
        .json<
          {
            productid: number;
            isFavourite: boolean;
          }[]
        >(),
    select: (
      data,
    ): {
      productId: number;
      isFavourite: boolean;
      favouriteIds: string[];
    }[] => {
      return data.map((data: { productid: number; isFavourite: boolean }) => ({
        productId: data.productid,
        isFavourite: !!data.isFavourite,
        favouriteIds: ["124", "114", "115"],
      }));
    },
  });
};

export default useSuspenseFavouriteSKUs;
