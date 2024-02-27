import { ACCOUNT_TOKEN_COOKIE } from "@/_lib/constants";
import { checkAvailability } from "@/_lib/shared-apis";
import { useQuery } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useCheckAvailability = (sku: string, quantity = 1) => {
  const [cookies] = useCookies();

  return useQuery({
    queryKey: [
      "product",
      sku,
      "availability",
      quantity,
      cookies[ACCOUNT_TOKEN_COOKIE],
    ],
    queryFn: () =>
      checkAvailability(cookies[ACCOUNT_TOKEN_COOKIE], sku, quantity),
    enabled: !!cookies[ACCOUNT_TOKEN_COOKIE] && !!quantity,
  });
};

export default useCheckAvailability;
