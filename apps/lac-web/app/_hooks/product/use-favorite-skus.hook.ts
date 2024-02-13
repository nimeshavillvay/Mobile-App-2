import { api } from "@/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/_lib/constants";
import { useQuery } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useFavoriteSkus = (sku: string) => {
  const [cookies] = useCookies();

  return useQuery({
    queryKey: ["user", "favorite", "sku", sku, cookies[ACCOUNT_TOKEN_COOKIE]],
    enabled: !!cookies[ACCOUNT_TOKEN_COOKIE],
    queryFn: () =>
      api
        .post("am/my-favourite/favourite-skus", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: [sku],
        })
        .json<
          [
            {
              sku: string;
              isFavourite: boolean;
            },
          ]
        >(),
  });
};

export default useFavoriteSkus;
