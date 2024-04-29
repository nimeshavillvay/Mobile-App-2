import { api } from "../api";
import { DEFAULT_REVALIDATE } from "../constants";

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

type Filters = {
  id: string;
  filter: string;
  values: {
    id: number;
    value: string;
    icon: string | null;
    tooltip: string | null;
    active: boolean;
  }[];
};

export const getFilters = async (
  args:
    | {
        type: typeof ORDER_HISTORY;
        from: string;
        to: string;
      }
    | {
        type: typeof PURCHASES;
        id: string;
        from: string;
        to: string;
      }
    | {
        type: typeof FAVORITES;
        id: string;
      }
    | {
        type: typeof CATEGORIES;
        id: string;
        membershipId: number;
      },
  revalidate = DEFAULT_REVALIDATE,
) => {
  const searchParams = new URLSearchParams();

  if (args.type === "Categories" && args.membershipId) {
    searchParams.append("membershipid", args.membershipId.toString());
  }

  if (
    (args.type === "Order History" || args.type === "Purchases") &&
    args.from &&
    args.to
  ) {
    searchParams.append("from", args.from);
    searchParams.append("to", args.to);
  }

  const response = await api
    .post(
      `rest/filters/${FILTER_TYPES[args.type]}${args.type !== "Order History" ? `/${args.id}` : ""}`,
      {
        searchParams,
        next: {
          revalidate,
        },
      },
    )
    .json<Filters[]>();

  return response.map((item) => ({
    id: item.id,
    filter: item.filter,
    values: item.values.map(({ id, value, icon, tooltip, active }) => ({
      id: Number(id),
      value: value,
      icon: icon,
      tooltip: tooltip,
      active: active,
    })),
  }));
};
