import { ACCOUNT_NO_COOKIE } from "@/old/_lib/constants";
import useCookies from "../storage/use-cookies.hook";
import useAccountList from "./use-account-list.hook";

const useSelectedAccount = () => {
  const accountListQuery = useAccountList();
  const [cookies] = useCookies();

  return accountListQuery.data?.accounts.find(
    (account) => parseInt(account["account-no"]) === cookies[ACCOUNT_NO_COOKIE],
  );
};

export default useSelectedAccount;
