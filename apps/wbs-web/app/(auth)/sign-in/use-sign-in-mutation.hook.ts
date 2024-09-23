import { revalidateSiteLayout } from "@/_actions/revalidate";
import { api } from "@/_lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const loginResponseSchema = z.object({
  status_code: z.string(),
  user_id: z.string(),
  authentication: z.object({
    authorities: z.array(
      z.object({
        authority: z.string(),
      }),
    ),
    name: z.string(),
    change_password: z.boolean().optional(),
    is_sales_rep: z.boolean().optional(),
  }),
});

export type SignInCredentials = {
  userName: string;
  password: string;
};

export type SignInResponse = {
  statusCode: string;
  userId: string;
  authentication: {
    authorities: {
      authority: string;
    }[];
    name: string;
    changePassword?: boolean;
    isSalesRep?: boolean;
  };
};

export const checkSignIn = async (
  credentials: SignInCredentials,
): Promise<SignInResponse> => {
  const response = await api.post("rest/auth/login", {
    json: credentials,
  });
  const responseData = await response.json();
  const { status_code, user_id, authentication } =
    loginResponseSchema.parse(responseData);

  return {
    statusCode: status_code,
    userId: user_id,
    authentication: {
      authorities: authentication.authorities,
      name: authentication.name,
      changePassword: authentication.change_password,
      isSalesRep: authentication.is_sales_rep,
    },
  };
};

const useSignInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: SignInCredentials) => checkSignIn(credentials),
    onSuccess: async () => {
      queryClient.invalidateQueries();
      await revalidateSiteLayout("/");
    },
  });
};

export default useSignInMutation;
