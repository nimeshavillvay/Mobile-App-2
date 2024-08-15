import { api } from "@/_lib/api";
import type { Filters } from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const ORDER_HISTORY = "Order History";
const PURCHASES = "Purchases";
const FAVORITES = "Favorites";
const CATEGORIES = "Categories";
const FILTER_TYPES = {
  [ORDER_HISTORY]: "O",
  [PURCHASES]: "P",
  [FAVORITES]: "F",
  [CATEGORIES]: "C",
} as const;

type Values = {
  [key: string]: string[] | undefined;
};

const useSuspenseFilters = (
  token: string,
  args:
    | {
        type: typeof ORDER_HISTORY;
        from: string;
        to: string;
      }
    | {
        type: typeof PURCHASES;
        from: string;
        to: string;
        values: Values;
      }
    | {
        type: typeof FAVORITES;
        id: string;
      }
    | {
        type: typeof CATEGORIES;
        id: string;
        values: Values;
      },
) => {
  return useSuspenseQuery({
    queryKey: ["filters", args, token],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      const rfData: {
        [attributeId: string]: {
          [valueId: string]: "Y";
        };
      } = {};

      if (args.type === "Categories") {
        for (const [key, values] of Object.entries(args.values)) {
          if (values) {
            for (const value of values) {
              rfData[key] = {
                ...rfData[key],
                [value]: "Y",
              };
            }
          }
        }
      }

      if (args.type === "Purchases" && args.from && args.to && args.values) {
        searchParams.append("from", args.from);
        searchParams.append("to", args.to);
        for (const [key, values] of Object.entries(args.values)) {
          if (values) {
            for (const value of values) {
              rfData[key] = {
                ...rfData[key],
                [value]: "Y",
              };
            }
          }
        }
      }

      if (args.type === "Order History" && args.from && args.to) {
        searchParams.append("from", args.from);
        searchParams.append("to", args.to);
      }

      return await api
        .post(
          `rest/filters/${FILTER_TYPES[args.type]}${args.type !== "Order History" && args.type !== "Purchases" ? `/${args.id}` : ""}`,
          {
            searchParams,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            json: {
              rf_data: rfData,
            },
            cache: "no-store",
          },
        )
        .json<Filters[]>();
    },
  });
};

export default useSuspenseFilters;
