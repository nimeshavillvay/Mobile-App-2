import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseWillCallPlant = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["user", "will-call-plant", token],
    queryFn: () =>
      api
        .get("rest/my-account/will-call-plant", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        })
        .json<{
          plant: string;
        }>(),
  });
};

export default useSuspenseWillCallPlant;
