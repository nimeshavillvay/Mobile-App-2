import { updateSearchParams } from "@/(old-design)/_utils/client-helpers";
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

  params.map(function (param) {
    newSearchParams.set(param.key, param.value);
  });

  updateSearchParams(newSearchParams);
};

export const generateItemUrl = (group_id: string, sku: string) => {
  if (group_id && sku) {
    return `/product-item/${group_id}/${sku}`;
  }
  return "#";
};
