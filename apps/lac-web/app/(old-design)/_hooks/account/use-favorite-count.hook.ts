import { api } from "@/old/_lib/api";
import { useQuery } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useFavoriteCount = () => {
  const [cookies] = useCookies();

  return useQuery({
    queryKey: ["user", "favorite-count", cookies.token],
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

export default useFavoriteCount;
