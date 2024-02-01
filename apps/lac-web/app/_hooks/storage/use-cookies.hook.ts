import { useCookies as useReactCookies } from "react-cookie";

const useCookies = () => {
  return useReactCookies(["token", "account-token"]);
};

export default useCookies;
