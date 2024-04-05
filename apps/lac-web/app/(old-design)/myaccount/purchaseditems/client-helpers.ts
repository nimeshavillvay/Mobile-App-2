import { updateSearchParams } from "@/old/_utils/client-helpers";
import "client-only";
import { QUERY_KEYS } from "./constants";

export const changeSearchParams = (
  searchParams: URLSearchParams,
  params: {
    key: (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
    value: string;
  }[],
) => {
  const newSearchParams = new URLSearchParams(searchParams);

  params.map((param) => {
    newSearchParams.set(param.key, param.value);
  });

  updateSearchParams(newSearchParams);
};

export const generateItemUrl = (groupId: string, sku: string) => {
  if (groupId && sku) {
    return `/product-item/${groupId}/${sku}`;
  }
  return "#";
};
