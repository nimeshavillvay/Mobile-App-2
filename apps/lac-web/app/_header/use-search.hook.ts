import { searchApi } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";

type SearchResult = {
  id: string;
  description: string;
  title: string;
  img: string;
  code: string;
};

type SearchData = {
  meta: {
    total: number;
    page_size: number;
    page_no: number;
    plp: boolean;
  };
  results: SearchResult[];
};

const useMultiSearch = (query: string) => {
  return useQuery({
    queryKey: ["multi-search", query],
    queryFn: async () => {
      console.log("> query: ", query);

      const response = await searchApi
      .get("/", {
        searchParams: new URLSearchParams({
          query,
        }),
      })

      console.log('> response: ', response.status)

      const data = await response.json<{
        products: SearchData;
        categories: SearchData;
        brands: SearchData;
      }>()

      console.log('> data: ', data);

      return data
    },
  });
};

export default useMultiSearch;
