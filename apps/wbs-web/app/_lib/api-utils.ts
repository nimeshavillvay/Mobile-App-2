import useCookies from "@/_hooks/storage/use-cookies.hook";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";

export const useAuthHeaders = () => {
  const [cookies] = useCookies();
  return {
    Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
  };
};
