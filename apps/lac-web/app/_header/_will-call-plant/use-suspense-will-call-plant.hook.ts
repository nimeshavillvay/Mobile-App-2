import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseWillCallPlant = (token: string) => {
  // TODO - This is a temporary fix to prevent the page from breaking when the user is not logged in
  const checkLoginQuery = useSuspenseCheckLogin(token);

  const isNotLoggedIn = checkLoginQuery?.data?.status_code === "NOT_LOGGED_IN";

  if (isNotLoggedIn) {
    return undefined;
  }

  return useSuspenseQuery({
    queryKey: ["user", "will-call-plant", token],
    queryFn: () => {
      return api
        .get("rest/my-account/will-call-plant", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        })
        .json<{
          plant: string;
          address?: {
            "country-name": string;
            locality: string;
            "phone-number": string;
            region: string;
            "street-address": string;
            "postal-code": string;
          };
          operation_hours?: string;
          gmap?: string;
        }>();
    },
  });
};

export default useSuspenseWillCallPlant;
