import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const loginCheck = async (token: string) => {
  return api
    .get("rest/auth/login-check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      throwHttpErrors: false,
    })
    .json<
      | {
          status_code: "OK";
          user_id: string;
          sales_rep_id?: string;
          user: {
            billto: string;
            user_id: string;
            email: string;
            phone: string;
            company: string;
            fullname: string;
            sales_rep: string;
          };
        }
      | { status_code: "NOT_LOGGED_IN" }
    >();
};

const useSuspenseCheckLogin = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["user", "login-status", token],
    queryFn: () => loginCheck(token),
  });
};

export default useSuspenseCheckLogin;
