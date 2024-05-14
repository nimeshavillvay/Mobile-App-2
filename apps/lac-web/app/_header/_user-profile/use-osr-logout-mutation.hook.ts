import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useOSRLogoutMutation = () => {
  const router = useRouter();

  const [cookies] = useCookies();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      api
        .get("rest/auth/logout-sales-rep", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
        })
        .json<{
          status_code: "OK";
        }>(),
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.replace("/");
    },
  });
};

export default useOSRLogoutMutation;
