import { searchApi } from "@/_lib/api";
import "server-only";

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

export const getSearchResults = async ({
  query,
  pageNo = "1",
}: {
  pageNo?: string;
  query: string;
}) => {
  return await searchApi
    .get("search", {
      searchParams: new URLSearchParams({
        pageNo,
        query,
        isFilterByBrand: "false",
        pageSize: "24",
      }),
      cache: "no-store",
    })
    .json<SearchData>();
};
