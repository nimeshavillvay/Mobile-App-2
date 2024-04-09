import { getFilters } from "@/_lib/apis/shared";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseFilters = (args: Parameters<typeof getFilters>[0]) => {
  return useSuspenseQuery({
    queryKey: ["filters", args],
    queryFn: () => getFilters(args, 0),
  });
};

export default useSuspenseFilters;
