import {
  ACCOUNT_NO_COOKIE,
  ACCOUNT_TOKEN_COOKIE,
  ADDRESS_ID_COOKIE,
  TOKEN_COOKIE,
} from "@/_lib/constants";
import { usePathname, useRouter } from "next/navigation";
import useCookies from "../storage/use-cookies.hook";

const useLogout = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [, , removeCookie] = useCookies();

  return () => {
    removeCookie(TOKEN_COOKIE);
    removeCookie(ACCOUNT_TOKEN_COOKIE);
    removeCookie(ACCOUNT_NO_COOKIE);
    removeCookie(ADDRESS_ID_COOKIE);

    if (pathname !== "/") {
      router.replace("/");
    }
  };
};

export default useLogout;
