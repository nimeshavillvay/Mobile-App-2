import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";

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

const filtersSchema = z.array(
  z.object({
    id: z.string(),
    filter: z.string(),
    values: z.array(
      z.object({
        id: z.number(),
        value: z.string(),
        icon: z.string(),
        tooltip: z.string(),
        active: z.boolean(),
      }),
    ),
  }),
);

export type FilterType =
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
    };

export const getFilters = async (
  { baseUrl, apiKey, token }: AuthenticatedApiConfig,
  args: FilterType,
) => {
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

  const response = await api
    .post(
      `rest/filters/${FILTER_TYPES[args.type]}${args.type !== "Order History" && args.type !== "Purchases" ? `/${args.id}` : ""}`,
      {
        prefixUrl: baseUrl,
        searchParams,
        headers: {
          "X-AUTH-TOKEN": apiKey,
          Authorization: `Bearer ${token}`,
        },
        json: {
          rf_data: rfData,
        },
        cache: "no-store",
      },
    )
    .json();

  return await filtersSchema.parseAsync(response);
};
