import { searchApi } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

type SearchResult = {
  id: string;
  slug: string;
};

type SearchData = {
  summary: {
    plp: boolean;
  };
  results: SearchResult[];
};

export const placeholderData: SearchData = {
  summary: {
    plp: false,
  },
  results: [],
};
const useSuspenseBarcodeSearch = (query: string) => {
  return useSuspenseQuery<SearchData>({
    queryKey: ["on-barcode-scan-search", query],
    queryFn: async () => {
      const response = await searchApi.get("barcode", {
        searchParams: new URLSearchParams({
          query,
        }),
      });
      return response.json();
    },
  });
};

export default useSuspenseBarcodeSearch;
