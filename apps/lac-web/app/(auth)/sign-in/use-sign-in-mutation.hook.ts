import { api } from "@/_lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { EMAIL_COOKIE } from "../constants";
import useSignInCookies from "../use-sign-in-cookies.hook";

const useSignInMutation = () => {
  const router = useRouter();
  const [, , deleteCookies] = useSignInCookies();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await api
        .post("rest/auth/login", {
          json: {
            userName: email,
            password,
          },
        })
        .json<{
          status_code: string;
          user_id: number;
          authentication: {
            authorities: {
              authority: string;
            }[];
            name: string;
            change_password?: boolean;
            is_sales_rep?: boolean;
          };
          change_password?: boolean;
        }>();

      const { status_code, user_id, authentication, change_password } =
        response;

      const authorities = authentication?.authorities;
      const authority = authorities?.[0]?.authority;

      const transformData = {
        statusCode: status_code,
        userId: user_id,
        authentication: {
          authorities: {
            authority: authority,
          },
          name: authentication?.name,
          isPasswordChanged: authentication?.change_password,
          isSalesRep: authentication?.is_sales_rep,
        },
        isPasswordChanged: change_password,
      };

      return transformData;
    },
    onSuccess: () => {
      deleteCookies(EMAIL_COOKIE);
      router.replace("/");
    },
  });
};

export default useSignInMutation;
