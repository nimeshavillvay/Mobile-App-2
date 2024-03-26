import { api } from "@/old/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ItemAttributes } from "./types";

const useSuspenseItemAttributes = (token: string, sku: string) => {
  return useSuspenseQuery({
    queryKey: ["user", "item-attributes", token, sku],
    queryFn: () =>
      api
        .get("pim/webservice/rest/oderhistoryattribute", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          searchParams: { sku },
        })
        .json<ItemAttributes>(),
  });
};

export default useSuspenseItemAttributes;
