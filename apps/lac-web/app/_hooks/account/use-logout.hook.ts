import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import useCookies from "../storage/use-cookies.hook";
import useAccountNo from "./use-account-no.hook";
import useAddressId from "./use-address-id.hook";

const useLogout = () => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [, , removeCookie] = useCookies();
  const [, , { removeItem: removeAccountNo }] = useAccountNo();
  const [, , { removeItem: removeAddressID }] = useAddressId();

  return () => {
    removeCookie("token");
    removeAccountNo();
    removeAddressID();

    queryClient.removeQueries({
      queryKey: ["user"],
    });

    if (pathname !== "/") {
      router.replace("/");
    }
  };
};

export default useLogout;
