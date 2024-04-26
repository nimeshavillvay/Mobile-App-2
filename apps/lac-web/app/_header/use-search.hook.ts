import { searchApi } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";

type SearchData = {
  meta: {
    total: number;
    page_size: number;
    page_no: number;
    plp: boolean;
  };
  results: SearchResult[];
};

type SearchResult = {
  id: string;
  description: string;
  title: string;
  img: string;
  code: string;
};
const useMultiSearch = (queryTerm: URLSearchParams) => {
  return useQuery({
    queryKey: ["multi-search", queryTerm],
    queryFn: () =>
      searchApi
        .get("/multisearch", {
          searchParams: queryTerm,
        })
        .json<{
          products: SearchData;
          categories: SearchData;
          brands: SearchData;
        }>(),
  });
};

export default useMultiSearch;
