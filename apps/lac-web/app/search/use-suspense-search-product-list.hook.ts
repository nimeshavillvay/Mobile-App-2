import { searchApi } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type SearchResult = {
  brandName: string;
  id: string;
  lastUpdatedDate: string | null;
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
  orderQuantityByIncrements: string;
  categoryPath: string;
  categoryName: string;
  attributes: string[] | null;
  itemImage: string;
  slug: string;
};

type SearchData = {
  summary: {
    total: number;
    page_size: number;
    page_no: number;
    plp: boolean;
    searchParams?: string;
  };
  results: SearchResult | SearchResult[];
};

export const placeholderData: SearchData = {
  summary: {
    total: 0,
    page_size: 0,
    page_no: 0,
    plp: false,
  },
  results: [],
};

const useSuspenseSearchProductList = (query: string, pageNo: string) => {
  const [cachedSearchParams, setCachedSearchParams] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("searchParams");
    if (data) {
      setCachedSearchParams(data);
    }
  }, []);

  return useSuspenseQuery<SearchData>({
    queryKey: ["on-enter-search", query, "on-enter-search-pageNo", pageNo],
    queryFn: async () => {
      const response = await searchApi.get("search", {
        searchParams: new URLSearchParams({
          pageNo: pageNo || "1",
          query: query,
          isFilterByBrand: "false",
          pageSize: "24",
        }),
        headers: {
          searchParams: cachedSearchParams,
        },
      });
      const responseData: SearchData = await response.json();
      if (
        responseData.summary.total === 0 &&
        Array.isArray(responseData.results) &&
        responseData.results.length === 0
      ) {
        localStorage.setItem("total", "0");
      }

      if (
        responseData.summary.searchParams &&
        responseData.summary.total !== 0
      ) {
        const { searchParams } = responseData.summary;
        localStorage.setItem("searchParams", searchParams);
        localStorage.setItem("total", responseData.summary.total.toString());
      }

      return responseData;
    },
  });
};

export default useSuspenseSearchProductList;
