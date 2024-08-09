import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategoryList } from "~/apis/base/category/get-category-list";
import type { ApiConfig } from "~/lib/types";

const useSuspenseCategoryList = (config: ApiConfig, level: string) => {
  return useSuspenseQuery({
    queryKey: ["categorylist", level, config],
    queryFn: () => getCategoryList(config, level),
  });
};

export default useSuspenseCategoryList;
