import { getAccountList } from "@/_lib/shared-apis";
import { useQuery } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useAccountList = () => {
  const [cookies] = useCookies();

  return useQuery({
    queryKey: ["user", "account-list", cookies.token],
    queryFn: () => getAccountList(cookies.token),
    enabled: !!cookies.token,
  });
};

export default useAccountList;
