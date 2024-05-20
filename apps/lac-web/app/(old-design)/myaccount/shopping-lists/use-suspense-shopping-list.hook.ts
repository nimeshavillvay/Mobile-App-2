import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import type { Pagination } from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import type {
  ShoppingList,
  ShoppingListElement,
  ShoppingListElementResponse,
  ShoppingListResponse,
} from "./type";

const useSuspenseShoppingList = (sort: string, sortDirection: string) => {
  const [cookies] = useCookies();

  return useSuspenseQuery({
    queryKey: [
      "my-account",
      "shopping-list",
      cookies[SESSION_TOKEN_COOKIE],
      sort,
      sortDirection,
    ],
    queryFn: () =>
      api
        .get("rest/my-favourite/lists", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          searchParams: {
            sort: sort,
            sort_direction: sortDirection,
          },
        })
        .json<ShoppingListResponse>(),
    select: (data): ShoppingList => {
      const { lists, pagination } = data;

      const shoppingLists = lists.map(
        (list: ShoppingListElementResponse): ShoppingListElement => ({
          listId: list.list_id,
          listName: list.list,
          date: list.date,
          totalItem: list.totalItem,
        }),
      );

      const shoppingListPagination: Pagination = {
        totalCount: Number(pagination.db_count),
        offset: pagination.offset,
        perPage: pagination.perPage,
      };

      return { lists: shoppingLists, pagination: shoppingListPagination };
    },
  });
};

export default useSuspenseShoppingList;
