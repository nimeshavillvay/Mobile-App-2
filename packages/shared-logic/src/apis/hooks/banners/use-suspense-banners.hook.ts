import { useSuspenseQuery } from "@tanstack/react-query";
import { getBanners } from "~/apis/base/banners/get-banners";
import type { ApiConfig } from "~/lib/types";

const useSuspenseBanners = (config: ApiConfig, categoryId = 0) => {
  return useSuspenseQuery({
    queryKey: ["banners", categoryId, config],
    queryFn: () => getBanners(config, categoryId),
  });
};

export default useSuspenseBanners;
