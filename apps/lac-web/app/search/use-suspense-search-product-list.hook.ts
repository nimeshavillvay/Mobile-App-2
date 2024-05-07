import { multiSearchApi } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

type SearchResult = {
  brandName: string;
  id: string;
  lastUpadtedDate: string | null;
  MFRPartNo: string;
  sellingBookSequenceNo: string;
  UPCCode: string;
  alias: string;
  materialNumber: string;
  productTitle: string;
  Status: string;
  productStatus: string;
  createDate: string;
  keywords: string;
  minimumOrderQuantity: string;
  orderQuantitybyIncrements: string;
  categoryPath: string;
  categoryName: string;
  attributes: string[] | null;
  itemImages: string;
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

type Results = {
  products: SearchData;
};

export const placeholderData: Results = {
  products: {
    meta: {
      total: 0,
      page_size: 0,
      page_no: 0,
      plp: false,
    },
    results: [],
  },
};

const useSuspenseSearchProductList = (query: string) => {
  return useSuspenseQuery<Results>({
    queryKey: ["on-enter-search", query],
    queryFn: async () => {
      const response = await multiSearchApi.get("", {
        searchParams: new URLSearchParams({
          query,
        }),
      });
      return response.json();
    },
  });
};

export default useSuspenseSearchProductList;
