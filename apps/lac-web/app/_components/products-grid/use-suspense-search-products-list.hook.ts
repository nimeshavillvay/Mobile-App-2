import useSuspenseSearch from "@/_hooks/search/use-suspense-search.hook";
import useFilterParams from "./use-filter-params.hook";

const useSuspenseSearchProductList = (token: string, categoryId: string) => {
  const { pageNo, selectedValues } = useFilterParams(token, categoryId);

  const selectedFilters: {
    [attributeId: string]: string[];
  } = {};

  for (const [key, value] of Object.entries(selectedValues)) {
    selectedFilters[key] = value.values.map((v) => v.id);
  }
  return useSuspenseSearch(
    token,
    {
      categoryId,
      groupResults: true,
      page: pageNo,
    },
    selectedFilters,
  );
};

export default useSuspenseSearchProductList;
