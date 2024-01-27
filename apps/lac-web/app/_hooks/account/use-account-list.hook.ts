import { api } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useAccountList = () => {
  const [cookies] = useCookies();

  return useQuery({
    queryKey: ["user", "account-list", cookies.token],
    queryFn: () =>
      api
        .get("am/account-list", {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .json<{
          accounts: {
            isAssociate: boolean;
            name: string;
            "account-no": string;
            addresses: Address[];
            "billing-address": Address;
          }[];
          "given-name": string;
          "family-name": string;
          isOsr: boolean;
        }>(),
    enabled: !!cookies.token,
  });
};

export default useAccountList;

type Address = {
  "address-id": string;
  name: string;
  "street-address": string;
  locality: string;
  region: string;
  "postal-code": string;
  county: string;
  "country-name": string;
  plant?: string;
  route_info?: {
    route: string;
    routeName: string;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
  };
  "phone-no"?: string;
};
