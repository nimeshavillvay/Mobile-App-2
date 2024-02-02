import { ACCOUNT_TOKEN, TOKEN } from "@/_lib/constants";
import { useCookies as useReactCookies } from "react-cookie";

const useCookies = () => {
  return useReactCookies([TOKEN, ACCOUNT_TOKEN]);
};

export default useCookies;
