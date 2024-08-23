import { revalidateSiteLayout } from "@/_actions/revalidate";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const loginResponseSchema = z.object({
  status_code: z.string(),
  user_id: z.number(),
  authentication: z.object({
    authorities: z.array(
      z.object({
        authority: z.string(),
      }),
    ),
    name: z.string(),
  }),
  change_password: z.boolean().optional(),
  is_sales_rep: z.boolean().optional(),
});

export type SignInCredentials = {
  userName: string;
  password: string;
};

export type SignInResponse = {
  statusCode: string;
  userId: number;
  authentication: {
    authorities: {
      authority: string | undefined;
    };
    name: string | undefined;
  };
  changePassword: boolean | undefined;
  isSalesRep: boolean | undefined;
};

export const checkSignIn = async (
  credentials: SignInCredentials,
  token: string,
): Promise<SignInResponse> => {
  const response = await api.post("rest/auth/login", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    json: credentials,
  });
  const responseData = await response.json();
  const validatedData = loginResponseSchema.parse(responseData);

  return {
    statusCode: validatedData.status_code,
    userId: validatedData.user_id,
    authentication: {
      authorities: {
        authority: validatedData.authentication.authorities[0]?.authority,
      },
      name: validatedData.authentication.name,
    },
    changePassword: validatedData.change_password,
    isSalesRep: validatedData.is_sales_rep,
  };
};

const useSignInMutation = () => {
  const [cookies] = useCookies();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: SignInCredentials) =>
      checkSignIn(credentials, cookies[SESSION_TOKEN_COOKIE]),
    onSuccess: async () => {
      queryClient.invalidateQueries();
      await revalidateSiteLayout("/");
    },
  });
};

export default useSignInMutation;
