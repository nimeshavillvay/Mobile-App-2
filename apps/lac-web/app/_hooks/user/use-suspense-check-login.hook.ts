import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseCheckLogin = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["user", "login-status", token],
    queryFn: () =>
      api
        .get("rest/auth/login-check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          throwHttpErrors: false,
        })
        .json<
          | { status_code: "OK"; user_id: string; sales_rep_id?: string }
          | { status_code: "NOT_LOGGED_IN" }
        >(),
  });
};

export default useSuspenseCheckLogin;
