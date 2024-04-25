import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseCompanyProfileDetails = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["my-account", "company-profile", token],
    queryFn: () =>
      api
        .get("", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .json(),
  });
};

export default useSuspenseCompanyProfileDetails;
