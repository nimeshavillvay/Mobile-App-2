import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { useQuery } from "@tanstack/react-query";

type GroupFilter = {
  group_filters?: {
    values_ALL?: {
      GRADE: string[];
      FINISH: string[];
    };
    values_GRADE?: Record<string, Record<string, { productids: string[] }>>;
    values_FINISH?: Record<string, Record<string, { productids: string[] }>>;
  };
  edgebanding: string[]; // to be updated
};

const useLaminateFilter = (productId: number) => {
  return useQuery({
    queryKey: ["laminate-finder", "product", productId],
    queryFn: async () => {
      const response = await api
        .get(`rest/laminate-finder/product/${productId}`, {
          next: {
            revalidate: DEFAULT_REVALIDATE,
          },
        })
        .json<GroupFilter>();
      return {
        groupFilters: response.group_filters,
        edgebanding: response.edgebanding,
      };
    },
  });
};

export default useLaminateFilter;
