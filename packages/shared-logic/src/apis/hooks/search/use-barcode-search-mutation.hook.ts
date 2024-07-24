import { useMutation } from "@tanstack/react-query";
import { getBarcodeSearch } from "~/apis/base/search/get-barcode-search";
import type { SearchApiConfig } from "~/lib/types";

const useBarcodeSearchMutation = ({ baseUrl }: SearchApiConfig) => {
  return useMutation({
    mutationFn: async (query: string) => getBarcodeSearch({ baseUrl }, query),
  });
};

export default useBarcodeSearchMutation;
