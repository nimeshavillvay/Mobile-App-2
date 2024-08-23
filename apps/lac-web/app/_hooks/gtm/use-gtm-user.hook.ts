import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE, SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useQuery } from "@tanstack/react-query";

type GTMUser = {
  userid: string;
  account_type: string;
  account_industry: string;
  account_sales_category: string;
};

const useGtmUser = () => {
  const [cookies] = useCookies();
  const token = cookies[SESSION_TOKEN_COOKIE];
  return useQuery({
    queryKey: ["gtm", "user", token],
    queryFn: async () => {
      const response = await api
        .get("rest/gtm/user", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          next: {
            revalidate: DEFAULT_REVALIDATE, // todo: update if necessary
          },
        })
        .json<GTMUser>();
      return response;
    },
  });
};

export default useGtmUser;
