import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";

const useMyAccountFilters = <
  T extends "purchased-items" | "favorites",
  U extends "brands" | "categories" | "subCategories",
>(
  section: T,
  label: U,
  period: T extends "purchased-items"
    ? {
        from: string;
        to: string;
      }
    : undefined,
) => {
  const [cookies] = useCookies();

  return useQuery({
    queryKey: [
      "user",
      "my-account",
      section,
      "filters",
      label,
      period,
      cookies.token,
    ],
    queryFn: () =>
      api
        .get(
          `am/${section === "purchased-items" ? "order-history" : "my-favourite"}/filters`,
          {
            searchParams: new URLSearchParams({
              clickedLabel: label,
              ...period,
            }),
            headers: {
              authorization: `Bearer ${cookies.token}`,
            },
          },
        )
        .json<{
          data: {
            clickedLabel: unknown;
            brands: U extends "brands" ? Filter[] : null;
            categories: U extends "categories" ? Filter[] : null;
            subCategories: U extends "subCategories" ? Filter[] : null;
          };
          message: unknown;
          isSuccess: unknown;
        }>(),
    enabled: !!cookies.token,
  });
};

export default useMyAccountFilters;

type Filter = {
  name: string;
  id: number;
};
