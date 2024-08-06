import { useFilterParams } from "@/_components/products-grid";
import useSuspenseLaminateSearch from "@/_hooks/search/use-suspense-laminate-search.hook";
import type { Filters } from "@/_lib/types";

const useSuspenseSearchLaminateList = (token: string, filters: Filters[]) => {
  const { pageNo, selectedValues } = useFilterParams(filters);

  const selectedFilters: {
    [attributeId: string]: string[];
  } = {};

  for (const [key, value] of Object.entries(selectedValues)) {
    selectedFilters[key] = value.values.map((v) => v.id);
  }

  return useSuspenseLaminateSearch(
    token,
    {
      groupResults: true,
      page: pageNo,
    },
    selectedFilters,
  );
};

export default useSuspenseSearchLaminateList;
