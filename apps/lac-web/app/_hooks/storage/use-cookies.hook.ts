import { useCookies as useReactCookies } from "react-cookie";

const useCookies = () => {
  return useReactCookies(["token"]);
};

export default useCookies;
