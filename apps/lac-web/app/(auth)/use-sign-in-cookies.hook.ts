import { useCookies } from "react-cookie";
import { EMAIL_COOKIE } from "./constants";

const useSignInCookies = () => {
  return useCookies([EMAIL_COOKIE]);
};

export default useSignInCookies;
