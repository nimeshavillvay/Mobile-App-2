import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

const PRIVATE_ROUTES = ["/checkout", "/myaccount"];

const useLogoutMutation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [cookies] = useCookies();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      api
        .get("rest/auth/logout", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
        })
        .json<{
          status_code: "OK";
        }>(),
    onSuccess: () => {
      queryClient.invalidateQueries();

      PRIVATE_ROUTES.forEach((privateRoute) => {
        if (pathname.startsWith(privateRoute)) {
          router.replace("/sign-in");
        }
      });
    },
  });
};

export default useLogoutMutation;
