import { searchApi } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";
import type { Product, SearchResults } from "./types";

const useSearch = (searchText: string) => {
  return useQuery({
    queryKey: ["search", searchText],
    queryFn: () =>
      searchApi
        .get("search", {
          searchParams: {
            query: searchText,
          },
        })
        .json<SearchResults>(),
    enabled: !!searchText,
    select: (data): Product[] => {
      const { results } = data;

      return results.map((result) => ({
        sku: result._source.materialNumber,
        title: result._source.productTitle,
        image: result._source.item_images,
        minimumOrderQuantity: result._source.minimumOrderQuantity,
        orderQuantityByIncrements: result._source.orderQuantitybyIncrements,
      }));
    },
  });
};

export default useSearch;
