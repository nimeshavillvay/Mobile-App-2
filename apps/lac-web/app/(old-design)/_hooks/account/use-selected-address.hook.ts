import { ADDRESS_ID_COOKIE } from "@/old/_lib/constants";
import useCookies from "../storage/use-cookies.hook";
import useSelectedAccount from "./use-selected-account.hook";

const useSelectedAddress = () => {
  const account = useSelectedAccount();
  const [cookies] = useCookies();

  return account?.addresses.find(
    (address) => parseInt(address["address-id"]) === cookies[ADDRESS_ID_COOKIE],
  );
};

export default useSelectedAddress;
