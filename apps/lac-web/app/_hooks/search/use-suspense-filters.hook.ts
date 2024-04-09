import { api } from "@/_lib/api";
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
type FilterType = keyof typeof FILTER_TYPES;

const useSuspenseFilters = <T extends FilterType>({
  type,
  id,
  membershipId,
  from,
  to,
}: {
  type: T;
  id: T extends typeof ORDER_HISTORY ? string : undefined;
  membershipId: T extends typeof CATEGORIES ? number : undefined;
  from: T extends typeof ORDER_HISTORY | typeof PURCHASES ? string : undefined;
  to: T extends typeof ORDER_HISTORY | typeof PURCHASES ? string : undefined;
}) => {
  return useSuspenseQuery({
    queryKey: [
      "filters",
      {
        type,
        id,
        membershipId,
        from,
        to,
      },
    ],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (membershipId) {
        searchParams.append("membershipid", membershipId.toString());
      }

      if (from && to) {
        searchParams.append("from", from);
        searchParams.append("to", to);
      }

      return api
        .post(`rest/filters/${FILTER_TYPES[type]}${id ? `/${id}` : ""}`, {
          searchParams,
          cache: "no-store",
        })
        .json<
          {
            id: string;
            filter: string;
            values: {
              id: number;
              value: string;
              icon: string;
              tooltip: string;
              active: boolean;
            }[];
          }[]
        >();
    },
  });
};

export default useSuspenseFilters;
