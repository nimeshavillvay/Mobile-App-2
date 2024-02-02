import { usePathname, useRouter } from "next/navigation";
import useCookies from "../storage/use-cookies.hook";
import useAccountNo from "./use-account-no.hook";
import useAddressId from "./use-address-id.hook";

const useLogout = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [, , removeCookie] = useCookies();
  const [, , { removeItem: removeAccountNo }] = useAccountNo();
  const [, , { removeItem: removeAddressID }] = useAddressId();

  return () => {
    removeCookie("token");
    removeCookie("account-token");
    removeAccountNo();
    removeAddressID();

    if (pathname !== "/") {
      router.replace("/");
    }
  };
};

export default useLogout;
