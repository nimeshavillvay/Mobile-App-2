import { api } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useFavouriteCount = () => {
  const [cookies] = useCookies();

  return useQuery({
    queryKey: ["user", "favourite-count", cookies.token],
    queryFn: () =>
      api
        .get("am/my-favourite/total-count", {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .json<{ data: number; message: unknown; isSuccess: unknown }>(),
    enabled: !!cookies.token,
  });
};

export default useFavouriteCount;
